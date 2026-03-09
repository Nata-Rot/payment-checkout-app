"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./infrastructure/http/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    }));
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    app.useGlobalFilters(new http_exception_filter_1.AllExceptionsFilter());
    const doc = new swagger_1.DocumentBuilder()
        .setTitle('Payment Checkout API')
        .setDescription('RESTful API for product payment checkout')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, doc);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customCssUrl: 'https://unpkg.com/swagger-ui-dist@5/swagger-ui.css',
        customJs: [
            'https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js',
            'https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js',
        ],
    });
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log('API running on http://localhost:' + port);
    console.log('Swagger: http://localhost:' + port + '/api/docs');
}
bootstrap();
//# sourceMappingURL=main.js.map