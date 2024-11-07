import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';

const googleMapsClient = new Client({});
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

@Injectable()
export class AgencyService {
  // Lista fixa de agências do Banco do Brasil com lat/lng
  private agencies = [
    { id: 1, name: 'Agência A', address: 'Endereço A', lat: -23.561684, lng: -46.625378 },
    { id: 2, name: 'Agência B', address: 'Endereço B', lat: -22.908333, lng: -43.196388 },
    { id: 3, name: 'Agência C', address: 'Endereço C', lat: -25.428356, lng: -49.273251 },
    { id: 4, name: 'Agência D', address: 'Endereço D', lat: -19.916681, lng: -43.934493 },
    // Adicione mais agências conforme necessário
  ];

  // Função para encontrar as três agências mais próximas
  async findNearestAgencies(userLat: number, userLng: number) {
    try {
      const destinations = this.agencies.map(
        (agency) => `${agency.lat},${agency.lng}`,
      ).join('|');

      const response = await googleMapsClient.distancematrix({
        params: {
          origins: [`${userLat},${userLng}`],
          destinations: destinations,
          key: GOOGLE_MAPS_API_KEY,
        },
      });

      const distances = response.data.rows[0].elements.map((element, index) => ({
        agency: this.agencies[index],
        distance: element.distance.value,
      }));

      const nearestAgencies = distances
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)
        .map((item) => ({
          name: item.agency.name,
          address: item.agency.address,
          distance_km: (item.distance / 1000).toFixed(2),
        }));

      return nearestAgencies;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar agências mais próximas.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
