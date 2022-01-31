import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @ApiHideProperty()
    @IsOptional()
    id?: string;

    @ApiProperty(
        {
            description: 'The name of user',
            type: String
        }
    )
    @IsString()
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @IsOptional()
    @IsEmpty()
    isAdmin?: Boolean
}
