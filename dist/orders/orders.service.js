"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const decimal_transformer_1 = require("../common/decimal.transformer");
const enums_1 = require("../common/enums");
const entities_1 = require("../entities");
const TRANSITIONS = {
    [enums_1.OrderStatus.PENDING]: [enums_1.OrderStatus.PAID, enums_1.OrderStatus.CANCELLED],
    [enums_1.OrderStatus.PAID]: [enums_1.OrderStatus.PROCESSING, enums_1.OrderStatus.CANCELLED],
    [enums_1.OrderStatus.PROCESSING]: [enums_1.OrderStatus.SHIPPED, enums_1.OrderStatus.CANCELLED],
    [enums_1.OrderStatus.SHIPPED]: [enums_1.OrderStatus.COMPLETED],
    [enums_1.OrderStatus.COMPLETED]: [],
    [enums_1.OrderStatus.CANCELLED]: [],
};
let OrdersService = class OrdersService {
    dataSource;
    orders;
    constructor(dataSource, orders) {
        this.dataSource = dataSource;
        this.orders = orders;
    }
    generateOrderNumber() {
        const d = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();
        return `ORD-${d}-${rnd}`;
    }
    async create(dto) {
        const orderId = await this.dataSource.transaction(async (m) => {
            const address = await m.findOne(entities_1.CustomerAddress, {
                where: { id: dto.addressId, customerId: dto.customerId },
            });
            if (!address)
                throw new common_1.BadRequestException('Alamat tidak ditemukan atau bukan milik customer ini');
            const qtyByBook = new Map();
            for (const it of dto.items)
                qtyByBook.set(it.bookId, (qtyByBook.get(it.bookId) ?? 0) + it.quantity);
            const books = await m.find(entities_1.Book, {
                where: { id: (0, typeorm_2.In)([...qtyByBook.keys()]) },
                lock: { mode: 'pessimistic_write' },
            });
            if (books.length !== qtyByBook.size)
                throw new common_1.BadRequestException('Ada buku yang tidak ditemukan');
            const items = [];
            let total = 0;
            for (const book of books) {
                const qty = qtyByBook.get(book.id);
                if (!book.isAvailable)
                    throw new common_1.BadRequestException(`Buku "${book.title}" tidak tersedia`);
                if (book.stock < qty)
                    throw new common_1.BadRequestException(`Stok "${book.title}" tidak cukup (sisa ${book.stock}, diminta ${qty})`);
                const subtotal = (0, decimal_transformer_1.round2)(book.price * qty);
                total += subtotal;
                items.push(m.create(entities_1.OrderItem, { bookId: book.id, quantity: qty, price: book.price, subtotal }));
                book.stock -= qty;
                if (book.stock === 0)
                    book.isAvailable = false;
            }
            await m.save(books);
            const order = await m.save(m.create(entities_1.Order, {
                customerId: dto.customerId,
                orderNumber: this.generateOrderNumber(),
                status: enums_1.OrderStatus.PENDING,
                totalAmount: (0, decimal_transformer_1.round2)(total),
                shippingRecipientName: address.recipientName,
                shippingPhone: address.phone,
                shippingAddress: address.address,
                shippingCity: address.city,
                shippingPostalCode: address.postalCode,
                items,
            }));
            return order.id;
        });
        return this.findOne(orderId);
    }
    findAll(customerId) {
        return this.orders.find({
            where: customerId ? { customerId } : {},
            relations: { items: true, payment: true, shipment: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const order = await this.orders.findOne({
            where: { id },
            relations: { customer: true, items: { book: true }, payment: true, shipment: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        return order;
    }
    async changeStatus(id, next, manager) {
        const run = async (m) => {
            const order = await m.findOne(entities_1.Order, { where: { id }, lock: { mode: 'pessimistic_write' } });
            if (!order)
                throw new common_1.NotFoundException('Order tidak ditemukan');
            if (order.status === next)
                return order;
            if (!TRANSITIONS[order.status].includes(next))
                throw new common_1.ConflictException(`Transisi status ${order.status} -> ${next} tidak diperbolehkan`);
            if (next === enums_1.OrderStatus.CANCELLED)
                await this.restock(m, id);
            order.status = next;
            return m.save(order);
        };
        return manager ? run(manager) : this.dataSource.transaction(run);
    }
    async restock(m, orderId) {
        const items = await m.find(entities_1.OrderItem, { where: { orderId } });
        for (const it of items) {
            const book = await m.findOne(entities_1.Book, { where: { id: it.bookId }, withDeleted: true });
            if (!book)
                continue;
            book.stock += it.quantity;
            book.isAvailable = true;
            await m.save(book);
        }
    }
    async updateStatus(id, next) {
        await this.changeStatus(id, next);
        return this.findOne(id);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map