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
exports.UpdateShipmentStatusDto = exports.CreateShipmentDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../common/enums");
class CreateShipmentDto {
    orderId;
    courier;
    trackingNumber;
    static _OPENAPI_METADATA_FACTORY() {
        return { orderId: { required: true, type: () => String, format: "uuid" }, courier: { required: true, type: () => String, maxLength: 100 }, trackingNumber: { required: false, type: () => String, maxLength: 100 } };
    }
}
exports.CreateShipmentDto = CreateShipmentDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateShipmentDto.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'JNE' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateShipmentDto.prototype, "courier", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'JNE1234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateShipmentDto.prototype, "trackingNumber", void 0);
class UpdateShipmentStatusDto {
    status;
    trackingNumber;
    static _OPENAPI_METADATA_FACTORY() {
        return { status: { required: true, enum: require("../../common/enums").ShipmentStatus }, trackingNumber: { required: false, type: () => String, maxLength: 100 } };
    }
}
exports.UpdateShipmentStatusDto = UpdateShipmentStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ShipmentStatus }),
    (0, class_validator_1.IsEnum)(enums_1.ShipmentStatus),
    __metadata("design:type", String)
], UpdateShipmentStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nomor resi (opsional, bisa diisi saat status shipped)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateShipmentStatusDto.prototype, "trackingNumber", void 0);
//# sourceMappingURL=shipment.dto.js.map