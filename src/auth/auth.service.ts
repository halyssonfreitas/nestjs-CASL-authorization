import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username);
    console.log(user)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log(result)
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userDB = await this.userService.findOneByUserName(user.username);
    const payload = { username: userDB.username, sub: userDB.id};
    console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
