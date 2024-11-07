import { Controller, Get, Query } from '@nestjs/common';
import { AgencyService } from './agency.service';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  // Endpoint para encontrar as três agências mais próximas
  @Get('nearest')
  async getNearestAgencies(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ) {
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    return this.agencyService.findNearestAgencies(userLat, userLng);
  }

  @Get('nearest-by-cep')
  async getNearestAgenciesByCep(@Query('cep') cep: string) {
    const { lat, lng } = await this.agencyService.convertCepToLatLng(cep);
    return this.agencyService.findNearestAgencies(lat, lng);
  }
}
