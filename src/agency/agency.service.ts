import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  Client,
  PlacesNearbyRanking,
  Language,
} from '@googlemaps/google-maps-services-js';

const googleMapsClient = new Client({});
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

@Injectable()
export class AgencyService {
  async convertCepToLatLng(cep: string) {
    try {
      const response = await googleMapsClient.geocode({
        params: {
          address: cep,
          key: GOOGLE_MAPS_API_KEY,
          language: 'pt-BR' as Language,
        },
        timeout: 1000,
      });

      if (response.data.status !== 'OK' || !response.data.results.length) {
        throw new Error(`Erro ao buscar coordenadas para o CEP: ${cep}`);
      }

      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } catch (error) {
      console.error('Erro ao converter CEP para coordenadas:', error);
      throw new HttpException(
        'Erro ao converter CEP para coordenadas.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findNearestAgencies(userLat: number, userLng: number) {
    try {
      const response = await googleMapsClient.placesNearby({
        params: {
          location: { lat: userLat, lng: userLng },
          rankby: 'distance' as PlacesNearbyRanking,
          name: 'Banco do Brasil',
          type: 'bank',
          key: GOOGLE_MAPS_API_KEY,
          language: 'pt-BR' as Language,
        },
        timeout: 1000,
      });

      if (response.data.status !== 'OK') {
        throw new Error(
          `Erro na API do Google Places: ${response.data.status}`,
        );
      }

      const nearestAgencies = await Promise.all(
        response.data.results.map(async (place) => {
          const details = await googleMapsClient.placeDetails({
            params: {
              place_id: place.place_id,
              key: GOOGLE_MAPS_API_KEY,
              language: 'pt-BR' as Language,
            },
          });

          const placeDetails = details.data.result;
          return {
            nome: place.name,
            endereco: place.vicinity,
            localizacao: {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            },
            placeId: place.place_id,
            avaliacao: place.rating || 'N/A',
            totalAvaliacoes: place.user_ratings_total || 0,
            abertoAgora: place.opening_hours
              ? place.opening_hours.open_now
              : 'N/A',
            horarioFuncionamento: placeDetails.opening_hours
              ? placeDetails.opening_hours.weekday_text
              : 'Horários não disponíveis',
          };
        }),
      );

      return nearestAgencies;
    } catch (error) {
      console.error('Erro ao buscar agências mais próximas:', error);
      throw new HttpException(
        'Erro ao buscar agências mais próximas.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
