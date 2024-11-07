import {
  IsUUID,
  IsInt,
  IsBoolean,
  IsDateString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class UpdateDonationDto {
  @IsUUID()
  @IsOptional()
  userId?: string;

  @IsInt()
  @IsOptional()
  totalPoints?: number;

  @IsArray()
  @IsOptional()
  items?: any[]; // Permite array vazio ou com itens adicionais

  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsBoolean()
  @IsOptional()
  isFinished?: boolean;
}
