// donation.service.ts

import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { AddItemToDonationDto } from './dto/add-item-to-donation.dto';

@Injectable()
export class DonationService {
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar uma nova doação vazia
  async create(createDonationDto: CreateDonationDto) {
    return this.prisma.donation.create({
      data: {
        userId: createDonationDto.userId,
        totalPoints: 0,
        date: new Date(),
        isFinished: false,
      },
    });
  }

  async addItemToDonation(
    donationId: string,
    addItemDto: AddItemToDonationDto,
  ) {
    const { title } = addItemDto;

    // Buscar o item pelo título
    const item = await this.prisma.item.findFirst({
      where: { title },
    });

    if (!item) {
      throw new HttpException('Item não encontrado', HttpStatus.NOT_FOUND);
    }

    // Verificar se o item já existe na doação
    const existingDonationItem = await this.prisma.donationItem.findFirst({
      where: {
        donationId,
        itemId: item.id,
      },
    });

    if (existingDonationItem) {
      // Se o item já existe na doação, incrementa a quantidade
      await this.prisma.donationItem.update({
        where: { id: existingDonationItem.id },
        data: { quantity: existingDonationItem.quantity + 1 },
      });
    } else {
      // Se o item não existe na doação, cria um novo registro em DonationItem com quantidade 1
      await this.prisma.donationItem.create({
        data: {
          donationId,
          itemId: item.id,
          quantity: 1,
        },
      });
    }

    // Atualizar o total de pontos da doação
    const updatedDonation = await this.prisma.donation.update({
      where: { id: donationId },
      data: {
        totalPoints: {
          increment: item.points, // Incrementa os pontos com base nos pontos do item
        },
      },
      include: { items: true },
    });

    return updatedDonation;
  }

  // Método para finalizar a doação
  async finalizeDonation(id: string) {
    const donation = await this.prisma.donation.findUnique({
      where: { id },
    });
    if (!donation) {
      throw new NotFoundException('Doação não encontrada');
    }

    if (donation.isFinished) {
      throw new HttpException('Doação já finalizada', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.donation.update({
      where: { id },
      data: {
        isFinished: true,
      },
    });
  }
}
