import {
  IsUUID,
  IsInt,
  IsNotEmpty,
  IsBoolean,
  IsDateString,
  IsArray,
} from 'class-validator';

export class CreateDonationDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsNotEmpty()
  totalPoints: number;

  @IsArray()
  items: any[] = [];

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsBoolean()
  @IsNotEmpty()
  isFinished: boolean;
}
