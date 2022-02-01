import { forwardRef, HttpCode, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const crypto = require('crypto');

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository : Repository<User>
  ) { }

  create(createUserDto: CreateUserDto) {
    createUserDto.id = crypto.randomUUID()
    createUserDto.isAdmin = false
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find({
      select: ['id', 'username', 'email', 'isAdmin']
    })
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'username', 'email', 'isAdmin'],
      where: {id: id}
    })
    if (!user) {
      throw new HttpException("The user with gived id was not found in database", HttpStatus.NOT_FOUND)
    }
    return user;
  }

  findOneByUserName(username: string) {
    return this.userRepository.findOne({username: username});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
