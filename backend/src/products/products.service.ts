import { Injectable } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'generated/prisma';

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
    return await this.prismaService.product.findMany();
  }
}
