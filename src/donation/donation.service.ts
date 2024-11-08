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
  constructor(private readonly prisma: PrismaService) { }

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

    const item = await this.prisma.item.findFirst({
      where: { title },
    });

    if (!item) {
      throw new HttpException('Item não encontrado', HttpStatus.NOT_FOUND);
    }

    const existingDonationItem = await this.prisma.donationItem.findFirst({
      where: {
        donationId,
        itemId: item.id,
      },
    });

    if (existingDonationItem) {
      await this.prisma.donationItem.update({
        where: { id: existingDonationItem.id },
        data: { quantity: existingDonationItem.quantity + 1 },
      });
    } else {
      await this.prisma.donationItem.create({
        data: {
          donationId,
          itemId: item.id,
          quantity: 1,
        },
      });
    }

    const updatedDonation = await this.prisma.donation.update({
      where: { id: donationId },
      data: {
        totalPoints: {
          increment: item.points,
        },
      },
      include: { items: true },
    });

    return updatedDonation;
  }

  async getDonationById(id: string) {
    const donation = await this.prisma.donation.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!donation) {
      throw new NotFoundException('Doação não encontrada');
    }

    return donation;
  }

  async finalizeDonation(id: string) {
    const donation = await this.prisma.donation.findUnique({
      where: { id },
      include: {
        user: true,
        items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!donation) {
      throw new NotFoundException('Doação não encontrada');
    }

    if (donation.isFinished) {
      throw new HttpException('Doação já finalizada', HttpStatus.BAD_REQUEST);
    }

    const user = donation.user;

    if (!user) {
      throw new NotFoundException('Usuário não encontrado para esta doação');
    }

    const totalWeight = donation.items.reduce((total, donationItem) => {
      return total + donationItem.item.weight * donationItem.quantity;
    }, 0);

    const updatedDonation = await this.prisma.donation.update({
      where: { id },
      data: {
        isFinished: true,
      },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        points: user.points + donation.totalPoints,
      },
    });

    return {
      ...updatedDonation,
      totalWeight,
    };
  }
}
