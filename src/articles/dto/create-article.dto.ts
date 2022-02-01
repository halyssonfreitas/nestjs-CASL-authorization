import { IsBoolean, IsEmpty, IsOptional, IsString } from "class-validator";

export class CreateArticleDto {
    @IsOptional()
    id?: string

    @IsOptional()
    @IsBoolean()
    isPublished?: boolean;

    @IsOptional()
    @IsString()
    author?: string;
}
