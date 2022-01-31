import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { userForReturnFindAll } from './dto/return-user.dto';
import { erroApiResponse } from '../util/dto/error-ApiResponse.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('User')
@ApiUnauthorizedResponse({
  description: 'You are unauthorized to access this endpoint.',
  type: erroApiResponse
})
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  //@ApiBody({type: [CreateUserDto]})
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User
  })
  @ApiBadRequestResponse({ description: 'The JSON from response must be wrong.' })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
    type: erroApiResponse
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The list of all users will be return',
    type: [userForReturnFindAll],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'One user will be return with a id',
    type: userForReturnFindAll
  })
  @ApiNotFoundResponse({
    description: 'The user with gived id was not found in database',
    type: erroApiResponse
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    description: 'The record has been successfully update.',
    type: User
  })
  @ApiNotFoundResponse({
    description: 'The user with gived id was not found in database',
    type: erroApiResponse
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
