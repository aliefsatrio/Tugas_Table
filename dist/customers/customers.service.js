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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let CustomersService = class CustomersService {
    customers;
    addresses;
    constructor(customers, addresses) {
        this.customers = customers;
        this.addresses = addresses;
    }
    create(dto) {
        return this.customers.save(this.customers.create(dto));
    }
    findAll() {
        return this.customers.find({ order: { createdAt: 'DESC' } });
    }
    async findOne(id) {
        const row = await this.customers.findOne({ where: { id }, relations: { addresses: true } });
        if (!row)
            throw new common_1.NotFoundException('Customer tidak ditemukan');
        return row;
    }
    async update(id, dto) {
        const row = await this.findOne(id);
        delete row.addresses;
        return this.customers.save(Object.assign(row, dto));
    }
    async remove(id) {
        await this.findOne(id);
        await this.customers.softDelete(id);
        return { deleted: true };
    }
    async addAddress(customerId, dto) {
        await this.findOne(customerId);
        return this.addresses.save(this.addresses.create({ ...dto, customerId }));
    }
    async listAddresses(customerId) {
        await this.findOne(customerId);
        return this.addresses.find({ where: { customerId }, order: { createdAt: 'ASC' } });
    }
    async findAddress(customerId, addressId) {
        const row = await this.addresses.findOne({ where: { id: addressId, customerId } });
        if (!row)
            throw new common_1.NotFoundException('Alamat tidak ditemukan');
        return row;
    }
    async updateAddress(customerId, addressId, dto) {
        const row = await this.findAddress(customerId, addressId);
        return this.addresses.save(Object.assign(row, dto));
    }
    async removeAddress(customerId, addressId) {
        const row = await this.findAddress(customerId, addressId);
        await this.addresses.remove(row);
        return { deleted: true };
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.CustomerAddress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map