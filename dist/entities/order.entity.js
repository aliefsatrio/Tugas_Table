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
exports.Order = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const decimal_transformer_1 = require("../common/decimal.transformer");
const enums_1 = require("../common/enums");
const customer_entity_1 = require("./customer.entity");
const order_item_entity_1 = require("./order-item.entity");
const payment_entity_1 = require("./payment.entity");
const shipment_entity_1 = require("./shipment.entity");
let Order = class Order {
    id;
    customerId;
    customer;
    orderNumber;
    status;
    totalAmount;
    shippingRecipientName;
    shippingPhone;
    shippingAddress;
    shippingCity;
    shippingPostalCode;
    items;
    payment;
    shipment;
    createdAt;
    updatedAt;
    deletedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, customerId: { required: true, type: () => String }, customer: { required: true, type: () => require("./customer.entity").Customer }, orderNumber: { required: true, type: () => String }, status: { required: true, enum: require("../common/enums").OrderStatus }, totalAmount: { required: true, type: () => Number }, shippingRecipientName: { required: true, type: () => String }, shippingPhone: { required: true, type: () => String }, shippingAddress: { required: true, type: () => String }, shippingCity: { required: true, type: () => String }, shippingPostalCode: { required: true, type: () => String }, items: { required: true, type: () => [require("./order-item.entity").OrderItem] }, payment: { required: true, type: () => require("./payment.entity").Payment }, shipment: { required: true, type: () => require("./shipment.entity").Shipment }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true } };
    }
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid' }),
    __metadata("design:type", String)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (c) => c.orders, { nullable: false, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", customer_entity_1.Customer)
], Order.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'order_number', type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], Order.prototype, "orderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: enums_1.OrderStatus.PENDING }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_amount', type: 'decimal', precision: 12, scale: 2, default: 0,
        transformer: decimal_transformer_1.DecimalTransformer,
    }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_recipient_name', type: 'varchar', length: 150 }),
    __metadata("design:type", String)
], Order.prototype, "shippingRecipientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_phone', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Order.prototype, "shippingPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_address', type: 'text' }),
    __metadata("design:type", String)
], Order.prototype, "shippingAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_city', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Order.prototype, "shippingCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shipping_postal_code', type: 'varchar', length: 10 }),
    __metadata("design:type", String)
], Order.prototype, "shippingPostalCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItem, (i) => i.order, { cascade: ['insert'] }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payment_entity_1.Payment, (p) => p.order),
    __metadata("design:type", payment_entity_1.Payment)
], Order.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => shipment_entity_1.Shipment, (s) => s.order),
    __metadata("design:type", shipment_entity_1.Shipment)
], Order.prototype, "shipment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "deletedAt", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'orders' }),
    (0, typeorm_1.Check)('"total_amount" >= 0')
], Order);
//# sourceMappingURL=order.entity.js.map