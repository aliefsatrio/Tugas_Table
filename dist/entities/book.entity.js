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
exports.Book = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const decimal_transformer_1 = require("../common/decimal.transformer");
const book_author_entity_1 = require("./book-author.entity");
const category_entity_1 = require("./category.entity");
const order_item_entity_1 = require("./order-item.entity");
const publisher_entity_1 = require("./publisher.entity");
let Book = class Book {
    id;
    title;
    isbn;
    publishedYear;
    isAvailable;
    price;
    stock;
    categoryId;
    category;
    publisherId;
    publisher;
    bookAuthors;
    orderItems;
    createdAt;
    updatedAt;
    deletedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, isbn: { required: true, type: () => String }, publishedYear: { required: true, type: () => Number }, isAvailable: { required: true, type: () => Boolean }, price: { required: true, type: () => Number }, stock: { required: true, type: () => Number }, categoryId: { required: true, type: () => String, nullable: true }, category: { required: true, type: () => require("./category.entity").Category, nullable: true }, publisherId: { required: true, type: () => String, nullable: true }, publisher: { required: true, type: () => require("./publisher.entity").Publisher, nullable: true }, bookAuthors: { required: true, type: () => [require("./book-author.entity").BookAuthor] }, orderItems: { required: true, type: () => [require("./order-item.entity").OrderItem] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true } };
    }
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 45, unique: true }),
    __metadata("design:type", String)
], Book.prototype, "isbn", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Book.prototype, "publishedYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Book.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0, transformer: decimal_transformer_1.DecimalTransformer }),
    __metadata("design:type", Number)
], Book.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Book.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'category_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Book.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (c) => c.books, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Object)
], Book.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ name: 'publisher_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Book.prototype, "publisherId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => publisher_entity_1.Publisher, (p) => p.books, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'publisher_id' }),
    __metadata("design:type", Object)
], Book.prototype, "publisher", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => book_author_entity_1.BookAuthor, (ba) => ba.book),
    __metadata("design:type", Array)
], Book.prototype, "bookAuthors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItem, (oi) => oi.book),
    __metadata("design:type", Array)
], Book.prototype, "orderItems", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Book.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Book.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], Book.prototype, "deletedAt", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)({ name: 'books' }),
    (0, typeorm_1.Check)('"stock" >= 0'),
    (0, typeorm_1.Check)('"price" >= 0')
], Book);
//# sourceMappingURL=book.entity.js.map