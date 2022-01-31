import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Article {

    @PrimaryColumn()
    @IsEmpty()
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    isPublished: boolean;
    
    @Column()
    @ApiProperty()
    authorId: number;
}
