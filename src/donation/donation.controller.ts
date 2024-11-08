import {
  Controller,
  Post,
  Put,
  Param,
  Body,
  HttpStatus,
  HttpException,
  Logger,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { AddItemToDonationDto } from './dto/add-item-to-donation.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('donations')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  // Rota para criar uma doação vazia
  @Post()
  async createDonation(
    @Body() createDonationDto: CreateDonationDto,
    @Req() req,
  ) {
    try {
      createDonationDto.userId = req.userid;
      const newDonation = await this.donationService.create(createDonationDto);
      return newDonation;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        'Erro ao criar doação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/add-item')
  async addItemToDonation(
    @Param('id') id: string,
    @Body() addItemToDonationDto: AddItemToDonationDto,
  ) {
    try {
      const updatedDonation = await this.donationService.addItemToDonation(
        id,
        addItemToDonationDto,
      );
      return updatedDonation;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        'Erro ao adicionar item à doação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getDonation(@Param('id') id: string) {
    try {
      const donation = await this.donationService.getDonationById(id);
      return donation;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        'Erro ao buscar doação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Rota para finalizar a doação
  @Put(':id/finalize')
  async finalizeDonation(@Param('id') id: string) {
    try {
      const donation = await this.donationService.finalizeDonation(id);
      return donation;
    } catch (error) {
      Logger.error(error);
      throw new HttpException(
        'Erro ao finalizar doação',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
