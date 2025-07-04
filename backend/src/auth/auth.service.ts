import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';
import { Response } from 'express';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        ms(
          this.configService.getOrThrow<string>(
            'JWT_EXPIRATION',
          ) as unknown as ms.StringValue,
        ),
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const token = await this.jwtService.signAsync(tokenPayload);

    response.cookie('Authentication', token, {
      secure: true,
      httpOnly: true,
    });

    return { tokenPayload };
  }

  async verifyUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) throw new UnauthorizedException();
      return user;
    } catch (_err) {
      throw new UnauthorizedException('Credentials are not valid');
    }
  }
}
