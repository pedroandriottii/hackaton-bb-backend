import { Module } from '@nestjs/common';
import { PredictionService } from './predict.service';
import { PredictionController } from './predict.controller';

@Module({
  controllers: [PredictionController],
  providers: [PredictionService],
})
export class PredictModule {}
