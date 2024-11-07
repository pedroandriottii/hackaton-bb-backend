import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class PredictionService {
  private endpointId = process.env.ENDPOINT_ID;
  private projectId = process.env.PROJECT_ID;
  private location = process.env.LOCATION;
  private gcloudToken = process.env.GCLOUD_TOKEN;
  private apiEndpoint = `https://${this.location}-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/${this.location}/endpoints/${this.endpointId}:predict`;

  async getPrediction(imageBase64: string) {
    const inputData = {
      instances: [
        {
          content: imageBase64,
        },
      ],
    };

    try {
      const response = await axios.post(this.apiEndpoint, inputData, {
        headers: {
          Authorization: `Bearer ${this.gcloudToken}`,
          'Content-Type': 'application/json',
        },
      });

      const predictions = response.data.predictions[0];
      const displayNames = predictions.displayNames || [];
      const confidences = predictions.confidences || [];

      if (displayNames.length > 0 && confidences.length > 0) {
        const maxConfidenceIndex = confidences.indexOf(
          Math.max(...confidences),
        );
        return {
          category: displayNames[maxConfidenceIndex],
          confidence: confidences[maxConfidenceIndex].toFixed(2),
        };
      } else {
        throw new HttpException(
          'Nenhuma previsão encontrada.',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.response ? error.response.data : error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
