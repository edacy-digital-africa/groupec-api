import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
import { CurrentUser } from '~/auth/decorators/current-user.decorator';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    fetchUsers(@CurrentUser() user: IUser): Promise<IUser[]> {
        console.log(user)
        return this.usersService.findAll();
    }

    // Create Betail

    // fetch Betails
}
