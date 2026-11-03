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
exports.BookAuthor = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const author_entity_1 = require("./author.entity");
const book_entity_1 = require("./book.entity");
let BookAuthor = class BookAuthor {
    bookId;
    authorId;
    book;
    author;
    static _OPENAPI_METADATA_FACTORY() {
        return { bookId: { required: true, type: () => String }, authorId: { required: true, type: () => String }, book: { required: true, type: () => require("./book.entity").Book }, author: { required: true, type: () => require("./author.entity").Author } };
    }
};
exports.BookAuthor = BookAuthor;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'book_id', type: 'uuid' }),
    __metadata("design:type", String)
], BookAuthor.prototype, "bookId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'author_id', type: 'uuid' }),
    __metadata("design:type", String)
], BookAuthor.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book, (b) => b.bookAuthors, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'book_id' }),
    __metadata("design:type", book_entity_1.Book)
], BookAuthor.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => author_entity_1.Author, (a) => a.bookAuthors, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'author_id' }),
    __metadata("design:type", author_entity_1.Author)
], BookAuthor.prototype, "author", void 0);
exports.BookAuthor = BookAuthor = __decorate([
    (0, typeorm_1.Entity)({ name: 'book_authors' })
], BookAuthor);
//# sourceMappingURL=book-author.entity.js.map