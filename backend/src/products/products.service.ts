import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'generated/prisma';
import { promises as fs } from 'fs';
import { join } from 'path';
import { PRODUCT_IMAGES } from './prpduct-images';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(
    data: CreateProductRequest,
    userId: string,
  ): Promise<Product> {
    try {
      return await this.prismaService.product.create({
        data: {
          ...data,
          userId: userId,
        },
      });
    } catch (err) {
      console.error(`Error occurred: ${err}`);
      throw err;
    }
  }

  async getAllProducts() {
    const products = await this.prismaService.product.findMany();
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageExists: await this.imageExists(product.id),
      })),
    );
  }

  private async imageExists(productId: string) {
    try {
      await fs.access(
        join(`${PRODUCT_IMAGES}/${productId}.jpg`),
        fs.constants.F_OK,
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  async getProductById(productId: string) {
    try {
      const product = await this.prismaService.product.findUniqueOrThrow({
        where: { id: productId },
      });
      return {
        ...product,
        imageExists: await this.imageExists(productId),
      };
    } catch (err) {
      throw new NotFoundException(`Product not found with Id: ${productId}`);
    }
  }
}
