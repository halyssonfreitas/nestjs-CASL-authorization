import { ApiProperty } from "@nestjs/swagger"

export class erroApiResponse {
    @ApiProperty()
    statusCode: number
    @ApiProperty()
    message: string
}