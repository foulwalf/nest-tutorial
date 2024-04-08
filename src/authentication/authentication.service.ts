import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { User } from '@prisma/client';

/**
 * @author Alexis YAO, <alexisaman8@gmail.com>
 */
@Injectable({})
export class AuthenticationService {
  constructor(private prisma: PrismaService) {}
  async signin(data: AuthDto): Promise<User> {
    //find user by email
    const user = await this.prisma.user
      .findUnique({
        where: {
          email: data.email,
        },
      })
      .catch((err) => {
        throw new NotFoundException('User not found');
      });

    console.log(user);

    const isPasswordValid = await argon.verify(
      user.hashedPassword,
      data.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid password');
    }

    delete user.hashedPassword;

    return user;
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
