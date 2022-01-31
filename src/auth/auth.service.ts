import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    console.log(user)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log(result)
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userDB = await this.usersService.findOneByUserName(user.username);
    const payload = { username: userDB.username, sub: userDB.id, roles: ['admin'] };
    console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
