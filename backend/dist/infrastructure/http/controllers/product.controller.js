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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const get_products_use_case_1 = require("../../../application/product/get-products.use-case");
const get_product_use_case_1 = require("../../../application/product/get-product.use-case");
let ProductController = class ProductController {
    getProducts;
    getProduct;
    constructor(getProducts, getProduct) {
        this.getProducts = getProducts;
        this.getProduct = getProduct;
    }
    async findAll() {
        const result = await this.getProducts.execute();
        if (result.isErr())
            throw result.error;
        return { data: result.value.map(p => p.toProps()) };
    }
    async findOne(id) {
        const result = await this.getProduct.execute(id);
        if (result.isErr())
            throw new common_1.NotFoundException(result.error.message);
        return { data: result.value.toProps() };
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('api/v1/products'),
    __metadata("design:paramtypes", [get_products_use_case_1.GetProductsUseCase,
        get_product_use_case_1.GetProductUseCase])
], ProductController);
//# sourceMappingURL=product.controller.js.map