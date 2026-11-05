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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enums_1 = require("../common/enums");
const entities_1 = require("../entities");
const orders_service_1 = require("../orders/orders.service");
let PaymentsService = class PaymentsService {
    dataSource;
    ordersService;
    payments;
    constructor(dataSource, ordersService, payments) {
        this.dataSource = dataSource;
        this.ordersService = ordersService;
        this.payments = payments;
    }
    async create(dto) {
        return this.dataSource.transaction(async (m) => {
            const order = await m.findOne(entities_1.Order, {
                where: { id: dto.orderId },
                lock: { mode: 'pessimistic_write' },
            });
            if (!order)
                throw new common_1.NotFoundException('Order tidak ditemukan');
            if (order.status !== enums_1.OrderStatus.PENDING)
                throw new common_1.ConflictException(`Order berstatus "${order.status}", tidak bisa dibayar`);
            if (await m.exists(entities_1.Payment, { where: { orderId: dto.orderId } }))
                throw new common_1.ConflictException('Order ini sudah memiliki catatan pembayaran');
            return m.save(m.create(entities_1.Payment, {
                orderId: order.id,
                paymentMethod: dto.paymentMethod,
                amount: order.totalAmount,
                status: enums_1.PaymentStatus.PENDING,
            }));
        });
    }
    findAll() {
        return this.payments.find({ relations: { order: true }, order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const row = await this.payments.findOne({ where: { id }, relations: { order: true } });
        if (!row)
            throw new common_1.NotFoundException('Payment tidak ditemukan');
        return row;
    }
    async updateStatus(id, status) {
        await this.dataSource.transaction(async (m) => {
            const payment = await m.findOne(entities_1.Payment, {
                where: { id },
                lock: { mode: 'pessimistic_write' },
            });
            if (!payment)
                throw new common_1.NotFoundException('Payment tidak ditemukan');
            if (payment.status === enums_1.PaymentStatus.PAID && status !== enums_1.PaymentStatus.PAID)
                throw new common_1.ConflictException('Pembayaran yang sudah paid tidak dapat diubah');
            if (payment.status === status)
                return;
            payment.status = status;
            payment.paidAt = status === enums_1.PaymentStatus.PAID ? (payment.paidAt ?? new Date()) : null;
            await m.save(payment);
            if (status === enums_1.PaymentStatus.PAID) {
                await this.ordersService.changeStatus(payment.orderId, enums_1.OrderStatus.PAID, m);
            }
        });
        return this.findOne(id);
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        orders_service_1.OrdersService,
        typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map