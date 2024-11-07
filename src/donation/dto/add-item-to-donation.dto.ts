import { IsString, IsNotEmpty } from 'class-validator';

export class AddItemToDonationDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
