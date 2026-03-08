import { IsEmail, IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail() email: string;
  @IsString() @IsNotEmpty() @MaxLength(150) fullName: string;
  @IsString() @Matches(/^(\+57)?[3][0-9]{9}$/, { message: 'Invalid Colombian phone number' }) phone: string;
}
