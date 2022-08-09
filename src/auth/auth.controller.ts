import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { User } from '~/users/dto/user.entity';
import { IUser } from '~/users/interfaces/user.interface';
import { AuthService } from './auth.service';
import { Session } from './dto/session.type';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiBody({ type: User })
    @ApiResponse({ status: 201, type: Session })
    @ApiResponse({ status: 400, description: 'On a une erreur 400 verifiez vos donnees' })
    @Post('register')
    register(@Body() user: IUser): Promise<Session> {
        return this.authService.register(user);
    }

    @Post('login')
    login(@Body() credentials: IUser): Promise<Session> {
        return this.authService.login(credentials);
    }
}
