import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @Length(1, 255)
  title: string;

  @IsString()
  @Length(1, 1000)
  description: string;

  @IsInt()
  @Min(0)
  points: number;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  donationId?: string;
}
