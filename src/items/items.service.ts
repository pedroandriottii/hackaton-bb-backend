import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(protected prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    return await this.prisma.item.create({
      data: createItemDto,
    });
  }

  async findAll() {
    return await this.prisma.item.findMany();
  }

  async findOne(title: string) {
    return await this.prisma.item.findFirst({
      where: {
        title,
      },
    });
  }

  async findOneById(id: string) {
    return await this.prisma.item.findUnique({
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
