import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';

@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  async createDonation(@Body() createDonationDto: CreateDonationDto) {
    try {
      const newDonation = await this.donationService.create(createDonationDto);
      return newDonation;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar doação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.donationService.findAll();
    } catch (error) {
      throw new HttpException(
        'Erro ao listar doações',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const donation = await this.donationService.findOne(id);
      if (!donation) {
        throw new HttpException('Doação não encontrada', HttpStatus.NOT_FOUND);
      }
      return donation;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar doação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ) {
    try {
      const updatedDonation = await this.donationService.update(
        id,
        updateDonationDto,
      );
      if (!updatedDonation) {
        throw new HttpException('Doação não encontrada', HttpStatus.NOT_FOUND);
      }
      return updatedDonation;
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar doação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const deleted = await this.donationService.delete(id);
      if (!deleted) {
        throw new HttpException('Doação não encontrada', HttpStatus.NOT_FOUND);
      }
      return { message: 'Doação deletada com sucesso' };
    } catch (error) {
      throw new HttpException(
        'Erro ao deletar doação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
