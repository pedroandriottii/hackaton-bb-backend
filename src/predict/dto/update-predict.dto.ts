import { PartialType } from '@nestjs/mapped-types';
import { CreatePredictDto } from './create-predict.dto';

export class UpdatePredictDto extends PartialType(CreatePredictDto) {}
