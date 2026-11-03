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
exports.UpdateOrderStatusDto = exports.CreateOrderDto = exports.OrderItemInputDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../common/enums");
class OrderItemInputDto {
    bookId;
    quantity;
    static _OPENAPI_METADATA_FACTORY() {
        return { bookId: { required: true, type: () => String, format: "uuid" }, quantity: { required: true, type: () => Number, minimum: 1 } };
    }
}
exports.OrderItemInputDto = OrderItemInputDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderItemInputDto.prototype, "bookId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OrderItemInputDto.prototype, "quantity", void 0);
class CreateOrderDto {
    customerId;
    addressId;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { customerId: { required: true, type: () => String, format: "uuid" }, addressId: { required: true, type: () => String, format: "uuid" }, items: { required: true, type: () => [require("./order.dto").OrderItemInputDto], minItems: 1 } };
    }
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID alamat milik customer (disalin sebagai snapshot ke order)' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "addressId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [OrderItemInputDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemInputDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
class UpdateOrderStatusDto {
    status;
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, enum: require("../../common/enums").OrderStatus } };
    }
}
exports.UpdateOrderStatusDto = UpdateOrderStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.OrderStatus }),
    (0, class_validator_1.IsEnum)(enums_1.OrderStatus),
    __metadata("design:type", String)
], UpdateOrderStatusDto.prototype, "status", void 0);
//# sourceMappingURL=order.dto.js.map