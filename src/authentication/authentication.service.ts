import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

/**
 * @author Alexis YAO, <alexisaman8@gmail.com>
 */
@Injectable({})
export class AuthenticationService {
  constructor(private prisma: PrismaService) {}
  signin(): any {
    return 'Hello signin';
  }

  async signup(data: AuthDto) {
    const password = await argon.hash(data.password);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        hashedPassword: password,
      },
    });

    delete user.hashedPassword;

    return user;
  }
}
