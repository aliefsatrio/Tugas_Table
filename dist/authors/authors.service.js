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
exports.AuthorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let AuthorService = class AuthorService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(dto) {
        return this.repo.save(this.repo.create(dto));
    }
    findAll() {
        return this.repo.find({ order: { name: 'ASC' } });
    }
    async findOne(id) {
        const row = await this.repo.findOne({ where: { id } });
        if (!row)
            throw new common_1.NotFoundException('Author tidak ditemukan');
        return row;
    }
    async update(id, dto) {
        const row = await this.findOne(id);
        return this.repo.save(Object.assign(row, dto));
    }
    async remove(id) {
        const row = await this.findOne(id);
        await this.repo.remove(row);
        return { deleted: true };
    }
};
exports.AuthorService = AuthorService;
exports.AuthorService = AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Author)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthorService);
//# sourceMappingURL=authors.service.js.map