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
exports.ShipmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enums_1 = require("../common/enums");
const entities_1 = require("../entities");
const orders_service_1 = require("../orders/orders.service");
const FLOW = {
    [enums_1.ShipmentStatus.PREPARING]: [enums_1.ShipmentStatus.SHIPPED],
    [enums_1.ShipmentStatus.SHIPPED]: [enums_1.ShipmentStatus.DELIVERED],
    [enums_1.ShipmentStatus.DELIVERED]: [],
};
let ShipmentsService = class ShipmentsService {
    dataSource;
    ordersService;
    shipments;
    constructor(dataSource, ordersService, shipments) {
        this.dataSource = dataSource;
        this.ordersService = ordersService;
        this.shipments = shipments;
    }
    async create(dto) {
        const id = await this.dataSource.transaction(async (m) => {
            const order = await m.findOne(entities_1.Order, { where: { id: dto.orderId } });
            if (!order)
                throw new common_1.NotFoundException('Order tidak ditemukan');
            if (order.status !== enums_1.OrderStatus.PAID)
                throw new common_1.ConflictException(`Order berstatus "${order.status}"; pengiriman hanya untuk order "paid"`);
            if (await m.exists(entities_1.Shipment, { where: { orderId: dto.orderId } }))
                throw new common_1.ConflictException('Order ini sudah memiliki data pengiriman');
            const shipment = await m.save(m.create(entities_1.Shipment, {
                orderId: dto.orderId,
                courier: dto.courier,
                trackingNumber: dto.trackingNumber ?? null,
                status: enums_1.ShipmentStatus.PREPARING,
            }));
            await this.ordersService.changeStatus(dto.orderId, enums_1.OrderStatus.PROCESSING, m);
            return shipment.id;
        });
        return this.findOne(id);
    }
    findAll() {
        return this.shipments.find({ relations: { order: true } });
    }
    async findOne(id) {
        const row = await this.shipments.findOne({ where: { id }, relations: { order: true } });
        if (!row)
            throw new common_1.NotFoundException('Shipment tidak ditemukan');
        return row;
    }
    async updateStatus(id, dto) {
        await this.dataSource.transaction(async (m) => {
            const shipment = await m.findOne(entities_1.Shipment, { where: { id } });
            if (!shipment)
                throw new common_1.NotFoundException('Shipment tidak ditemukan');
            if (!FLOW[shipment.status].includes(dto.status))
                throw new common_1.ConflictException(`Transisi ${shipment.status} -> ${dto.status} tidak diperbolehkan`);
            shipment.status = dto.status;
            if (dto.trackingNumber)
                shipment.trackingNumber = dto.trackingNumber;
            if (dto.status === enums_1.ShipmentStatus.SHIPPED) {
                shipment.shippedAt = new Date();
                await this.ordersService.changeStatus(shipment.orderId, enums_1.OrderStatus.SHIPPED, m);
            }
            else if (dto.status === enums_1.ShipmentStatus.DELIVERED) {
                shipment.deliveredAt = new Date();
                await this.ordersService.changeStatus(shipment.orderId, enums_1.OrderStatus.COMPLETED, m);
            }
            await m.save(shipment);
        });
        return this.findOne(id);
    }
};
exports.ShipmentsService = ShipmentsService;
exports.ShipmentsService = ShipmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Shipment)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        orders_service_1.OrdersService,
        typeorm_2.Repository])
], ShipmentsService);
//# sourceMappingURL=shipments.service.js.map