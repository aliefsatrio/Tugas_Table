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
exports.OrderItem = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const decimal_transformer_1 = require("../common/decimal.transformer");
const book_entity_1 = require("./book.entity");
const order_entity_1 = require("./order.entity");
let OrderItem = class OrderItem {
    id;
    orderId;
    order;
    bookId;
    book;
    quantity;
    price;
    subtotal;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, orderId: { required: true, type: () => String }, order: { required: true, type: () => require("./order.entity").Order }, bookId: { required: true, type: () => String }, book: { required: true, type: () => require("./book.entity").Book }, quantity: { required: true, type: () => Number }, price: { required: true, type: () => Number }, subtotal: { required: true, type: () => Number } };
    }
};
exports.OrderItem = OrderItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'order_id', type: 'uuid' }),
    __metadata("design:type", String)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (o) => o.items, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", order_entity_1.Order)
], OrderItem.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'book_id', type: 'uuid' }),
    __metadata("design:type", String)
], OrderItem.prototype, "bookId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book, (b) => b.orderItems, { nullable: false, onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'book_id' }),
    __metadata("design:type", book_entity_1.Book)
], OrderItem.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, transformer: decimal_transformer_1.DecimalTransformer }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, transformer: decimal_transformer_1.DecimalTransformer }),
    __metadata("design:type", Number)
], OrderItem.prototype, "subtotal", void 0);
exports.OrderItem = OrderItem = __decorate([
    (0, typeorm_1.Entity)({ name: 'order_items' }),
    (0, typeorm_1.Check)('"quantity" > 0'),
    (0, typeorm_1.Check)('"price" >= 0')
], OrderItem);
//# sourceMappingURL=order-item.entity.js.map