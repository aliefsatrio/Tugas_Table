"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const authors_module_1 = require("./authors/authors.module");
const books_module_1 = require("./books/books.module");
const categories_module_1 = require("./categories/categories.module");
const db_exception_filter_1 = require("./common/db-exception.filter");
const customers_module_1 = require("./customers/customers.module");
const entities = require("./entities");
const orders_module_1 = require("./orders/orders.module");
const payments_module_1 = require("./payments/payments.module");
const publishers_module_1 = require("./publishers/publishers.module");
const shipments_module_1 = require("./shipments/shipments.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (cfg) => ({
                    type: 'postgres',
                    host: cfg.get('DB_HOST', 'localhost'),
                    port: parseInt(cfg.get('DB_PORT', '5432'), 10),
                    username: cfg.get('DB_USERNAME', 'postgres'),
                    password: cfg.get('DB_PASSWORD', 'postgres'),
                    database: cfg.get('DB_NAME', 'bookstore'),
                    entities: Object.values(entities),
                    synchronize: cfg.get('DB_SYNCHRONIZE', 'true') === 'true',
                    logging: cfg.get('DB_LOGGING', 'false') === 'true',
                }),
            }),
            customers_module_1.CustomersModule,
            categories_module_1.CategoryModule,
            publishers_module_1.PublisherModule,
            authors_module_1.AuthorModule,
            books_module_1.BooksModule,
            orders_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            shipments_module_1.ShipmentsModule,
        ],
        providers: [{ provide: core_1.APP_FILTER, useClass: db_exception_filter_1.DbExceptionFilter }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map