import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';

@Injectable()
export class DonationService {
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar uma nova doação
  async create(createDonationDto: CreateDonationDto) {
    return this.prisma.donation.create({
      data: {
        ...createDonationDto,
      },
    });
  }

  // Método para listar todas as doações
  async findAll() {
    return this.prisma.donation.findMany();
  }

  // Método para buscar uma doação pelo ID
  async findOne(id: string) {
    const donation = await this.prisma.donation.findUnique({
      where: { id },
    });
    if (!donation) {
      throw new NotFoundException('Doação não encontrada');
    }
    return donation;
  }

  // Método para atualizar uma doação pelo ID
  async update(id: string, updateDonationDto: UpdateDonationDto) {
    const donation = await this.prisma.donation.findUnique({
      where: { id },
    });
    if (!donation) {
      throw new NotFoundException('Doação não encontrada');
    }

    return this.prisma.donation.update({
      where: { id },
      data: {
        ...updateDonationDto,
      },
    });
  }

  // Método para deletar uma doação pelo ID
  async delete(id: string) {
    const donation = await this.prisma.donation.findUnique({
      where: { id },
    });
    if (!donation) {
      throw new NotFoundException('Doação não encontrada');
    }

    await this.prisma.donation.delete({
      where: { id },
    });
    return { message: 'Doação deletada com sucesso' };
  }
}
