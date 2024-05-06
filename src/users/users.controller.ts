import {
    Body,
    Controller,
    Get,
    Header,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from '../auth/local.auth.guard';
// import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
// import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
      }


    @Post('/login')  
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    login(@Request() req) {
      return { user: req.user, msg: 'Logged in' };
    }
}
