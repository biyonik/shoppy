import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(
    data: CreateUserRequest,
  ): Promise<{ id: string; email: string }> {
    try {
      return await this.prismaService.user.create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
        },
        select: {
          id: true,
          email: true,
        },
      });
    } catch (error) {
      console.error(`Error occurred: ${error}`);
      throw error;
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUniqueOrThrow({
      where: filter,
    });
  }
}
