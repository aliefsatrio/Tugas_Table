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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const enums_1 = require("../common/enums");
const order_entity_1 = require("./order.entity");
let Shipment = class Shipment {
    id;
    orderId;
    order;
    courier;
    trackingNumber;
    status;
    shippedAt;
    deliveredAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, orderId: { required: true, type: () => String }, order: { required: true, type: () => require("./order.entity").Order }, courier: { required: true, type: () => String }, trackingNumber: { required: true, type: () => String, nullable: true }, status: { required: true, enum: require("../common/enums").ShipmentStatus }, shippedAt: { required: true, type: () => Date, nullable: true }, deliveredAt: { required: true, type: () => Date, nullable: true } };
    }
};
exports.Shipment = Shipment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Shipment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_id', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], Shipment.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_entity_1.Order, (o) => o.shipment, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", order_entity_1.Order)
], Shipment.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Shipment.prototype, "courier", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tracking_number', type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", Object)
], Shipment.prototype, "trackingNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, default: enums_1.ShipmentStatus.PREPARING }),
    __metadata("design:type", String)
], Shipment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipped_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Shipment.prototype, "shippedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivered_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Shipment.prototype, "deliveredAt", void 0);
exports.Shipment = Shipment = __decorate([
    (0, typeorm_1.Entity)({ name: 'shipments' })
], Shipment);
//# sourceMappingURL=shipment.entity.js.map