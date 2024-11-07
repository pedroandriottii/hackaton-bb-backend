import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class UpdateDonationDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsOptional()
  totalPoints?: number;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsDate()
  @IsOptional()
  date?: Date;
}
