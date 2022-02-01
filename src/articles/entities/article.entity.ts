import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Article {

    @PrimaryColumn()
    @IsEmpty()
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    isPublished: boolean;
    
    @ManyToOne(() => User, authorId => authorId.id)
    author: string;
}
