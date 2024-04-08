import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthDto } from './dto';

/**
 * @author Alexis YAO, <alexisaman8@gmail.com>
 */
@Controller('authentication')
export class AuthenticationController {
  constructor(private authentication: AuthenticationService) {}

  @Post('signin')
  async signin(@Body() request: AuthDto): Promise<any> {
    return await this.authentication.signin(request);
  }

  @Post('signup')
  signup(@Body() request: AuthDto): any {
    console.log(request);
    return this.authentication.signup(request);
  }
}
