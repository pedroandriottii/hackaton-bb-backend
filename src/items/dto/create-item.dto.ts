import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  points: number;

  @IsOptional()
  @IsUUID()
  donationId?: string;

  @IsNotEmpty()
  @IsInt()
  weight: number;
}
