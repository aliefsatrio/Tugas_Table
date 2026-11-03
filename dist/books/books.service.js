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
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let BooksService = class BooksService {
    dataSource;
    books;
    constructor(dataSource, books) {
        this.dataSource = dataSource;
        this.books = books;
    }
    relations = {
        category: true,
        publisher: true,
        bookAuthors: { author: true },
    };
    present(book) {
        const { bookAuthors, ...rest } = book;
        return { ...rest, authors: (bookAuthors ?? []).map((ba) => ba.author) };
    }
    async assertRefs(m, dto) {
        if (dto.categoryId && !(await m.exists(entities_1.Category, { where: { id: dto.categoryId } })))
            throw new common_1.BadRequestException('categoryId tidak ditemukan');
        if (dto.publisherId && !(await m.exists(entities_1.Publisher, { where: { id: dto.publisherId } })))
            throw new common_1.BadRequestException('publisherId tidak ditemukan');
        if (dto.authorIds?.length) {
            const found = await m.count(entities_1.Author, { where: { id: (0, typeorm_2.In)(dto.authorIds) } });
            if (found !== dto.authorIds.length)
                throw new common_1.BadRequestException('Ada authorIds yang tidak ditemukan');
        }
    }
    syncAvailability(book) {
        if (book.stock <= 0)
            book.isAvailable = false;
    }
    async create(dto) {
        const id = await this.dataSource.transaction(async (m) => {
            await this.assertRefs(m, dto);
            const { authorIds, ...data } = dto;
            const book = m.create(entities_1.Book, data);
            this.syncAvailability(book);
            const saved = await m.save(book);
            if (authorIds?.length) {
                await m.save(entities_1.BookAuthor, authorIds.map((authorId) => m.create(entities_1.BookAuthor, { bookId: saved.id, authorId })));
            }
            return saved.id;
        });
        return this.findOne(id);
    }
    async findAll(q) {
        const qb = this.books.createQueryBuilder('b')
            .leftJoinAndSelect('b.category', 'category')
            .leftJoinAndSelect('b.publisher', 'publisher')
            .leftJoinAndSelect('b.bookAuthors', 'ba')
            .leftJoinAndSelect('ba.author', 'author')
            .orderBy('b.createdAt', 'DESC');
        if (q.search)
            qb.andWhere('b.title ILIKE :s', { s: `%${q.search}%` });
        if (q.categoryId)
            qb.andWhere('b.category_id = :c', { c: q.categoryId });
        if (q.publisherId)
            qb.andWhere('b.publisher_id = :p', { p: q.publisherId });
        return (await qb.getMany()).map((b) => this.present(b));
    }
    async findOne(id) {
        const book = await this.books.findOne({ where: { id }, relations: this.relations });
        if (!book)
            throw new common_1.NotFoundException('Buku tidak ditemukan');
        return this.present(book);
    }
    async update(id, dto) {
        await this.dataSource.transaction(async (m) => {
            const book = await m.findOne(entities_1.Book, { where: { id } });
            if (!book)
                throw new common_1.NotFoundException('Buku tidak ditemukan');
            await this.assertRefs(m, dto);
            const { authorIds, ...data } = dto;
            Object.assign(book, data);
            this.syncAvailability(book);
            await m.save(book);
            if (authorIds) {
                await m.delete(entities_1.BookAuthor, { bookId: id });
                if (authorIds.length)
                    await m.save(entities_1.BookAuthor, authorIds.map((authorId) => m.create(entities_1.BookAuthor, { bookId: id, authorId })));
            }
        });
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.books.softDelete(id);
        return { deleted: true };
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], BooksService);
//# sourceMappingURL=books.service.js.map