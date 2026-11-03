"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('BookStore E-Commerce API')
        .setDescription('Studi kasus database relasional - NestJS + TypeORM + PostgreSQL')
        .setVersion('1.0')
        .build();
    swagger_1.SwaggerModule.setup('docs', app, swagger_1.SwaggerModule.createDocument(app, config));
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`API berjalan di http://localhost:${port}  |  Swagger: http://localhost:${port}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map