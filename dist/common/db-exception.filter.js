"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let DbExceptionFilter = class DbExceptionFilter {
    catch(exception, host) {
        const res = host.switchToHttp().getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Database error';
        switch (exception.code) {
            case '23505':
                status = common_1.HttpStatus.CONFLICT;
                message = `Data duplikat: ${exception.detail ?? 'unique constraint dilanggar'}`;
                break;
            case '23503':
                status = common_1.HttpStatus.CONFLICT;
                message = `Relasi tidak valid / data masih dipakai: ${exception.detail ?? ''}`;
                break;
            case '23514':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Nilai melanggar aturan constraint (mis. stok/harga negatif).';
                break;
            case '22P02':
                status = common_1.HttpStatus.BAD_REQUEST;
                message = 'Format data tidak valid.';
                break;
        }
        res.status(status).json({ statusCode: status, message, error: 'DatabaseError' });
    }
};
exports.DbExceptionFilter = DbExceptionFilter;
exports.DbExceptionFilter = DbExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], DbExceptionFilter);
//# sourceMappingURL=db-exception.filter.js.map