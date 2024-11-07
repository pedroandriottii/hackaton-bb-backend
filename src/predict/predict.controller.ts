import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { PredictionService } from './predict.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async sendImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      if (!file) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Nenhum arquivo de imagem enviado',
        });
      }

      // Converte a imagem para base64
      const imageBase64 = file.buffer.toString('base64');
      const prediction =
        await this.predictionService.getPrediction(imageBase64);

      return res.status(HttpStatus.OK).json({
        message: 'Previsão bem-sucedida',
        data: prediction,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao processar a imagem',
        error: error.message,
      });
    }
  }
}
