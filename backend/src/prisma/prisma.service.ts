import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  get productEntity() {
    return this.product;
  }

  get userEntity() {
    return this.user;
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
