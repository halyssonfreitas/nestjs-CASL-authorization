import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginUserDto {

    @ApiProperty({example: 'Halysson Freitas'})
    @IsString()
    username: string;

    @ApiProperty({example: '123'})
    @IsString()
    password: string;
}