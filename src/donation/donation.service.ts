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

    // Primeiro, buscar o item pelo título
    const item = await this.prisma.item.findFirst({
      where: { title },
    });

    if (!item) {
      throw new HttpException('Item não encontrado', HttpStatus.NOT_FOUND);
    }

    // Adicionar o item à doação conectando pelo `id` do item encontrado
    const updatedDonation = await this.prisma.donation.update({
      where: { id: donationId },
      data: {
        items: {
          connect: { id: item.id }, // Conecta usando o `id` obtido
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
