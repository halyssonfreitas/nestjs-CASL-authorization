import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { IsEmail, IsEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Article } from "src/articles/entities/article.entity";

@Entity()
export class User {

    @PrimaryColumn()
    @IsEmpty()
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    username: string;

    @Column()
    @IsEmail()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    password: string;

    @Column()
    @ApiProperty()
    isAdmin: Boolean

    @OneToMany(() => Article, article => article.author)
    articles: Article[]

}