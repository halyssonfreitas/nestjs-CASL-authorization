import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class userForReturnFindAll {
    @ApiProperty()
    id: string
    @ApiProperty()
    username: string
    @ApiProperty()
    email: string
}

