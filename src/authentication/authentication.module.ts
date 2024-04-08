import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';

/**
 * @author Alexis YAO, <alexisaman8@gmail.com>
 */

@Module({
  imports: [AuthenticationModule],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
