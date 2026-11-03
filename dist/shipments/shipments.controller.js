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
exports.ShipmentsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shipment_dto_1 = require("./dto/shipment.dto");
const shipments_service_1 = require("./shipments.service");
let ShipmentsController = class ShipmentsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) { return this.service.create(dto); }
    findAll() { return this.service.findAll(); }
    findOne(id) { return this.service.findOne(id); }
    updateStatus(id, dto) {
        return this.service.updateStatus(id, dto);
    }
};
exports.ShipmentsController = ShipmentsController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../entities/shipment.entity").Shipment }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shipment_dto_1.CreateShipmentDto]),
    __metadata("design:returntype", void 0)
], ShipmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../entities/shipment.entity").Shipment] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShipmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../entities/shipment.entity").Shipment }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    openapi.ApiResponse({ status: 200, type: require("../entities/shipment.entity").Shipment }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, shipment_dto_1.UpdateShipmentStatusDto]),
    __metadata("design:returntype", void 0)
], ShipmentsController.prototype, "updateStatus", null);
exports.ShipmentsController = ShipmentsController = __decorate([
    (0, swagger_1.ApiTags)('shipments'),
    (0, common_1.Controller)('shipments'),
    __metadata("design:paramtypes", [shipments_service_1.ShipmentsService])
], ShipmentsController);
//# sourceMappingURL=shipments.controller.js.map