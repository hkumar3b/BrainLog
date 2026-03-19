import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('me')
    getMe(@Request() req) {
        return this.usersService.findById(req.user.id);
    }
}