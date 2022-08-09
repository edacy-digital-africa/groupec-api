import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '~/users/interfaces/user.interface';
import { UsersService } from '~/users/users.service';
import { Session } from './dto/session.type';
import { verify, sign } from 'jsonwebtoken';
import { hash, genSalt, hashSync, compareSync } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService) {}

    async register(user: IUser): Promise<Session> {
        user.password = this.cryptText(user.password);
        let newUser = await this.userService.insert(user);
        const token = sign({ data: newUser }, 'secret', { expiresIn: '48h' });
        newUser = newUser.toObject();
        delete newUser.password;
        return { user: newUser, token };
    }

    async login(credentials: IUser): Promise<Session> {
        let user = await this.userService.findByEmailOrFail(credentials.email);

        if(!compareSync(credentials.password, user.password)) {
            throw new NotFoundException();
        }
        user = user.toObject();
        delete user.password;
        const token = sign({ data: user }, 'secret', { expiresIn: '1h' })
        return { user, token };
    }

    async isTokenValid(token: string): Promise<boolean | IUser> {
        return new Promise((resolve, reject) => {
            verify(token, 'secret', (err, result) => {
                if(err) {
                    resolve(false);
                } else {
                    resolve(result.data);
                }
            })
        });
    }

    cryptText(text: string): string {
        return hashSync(text, 10);
        // return new Promise((resolve, reject) => {
        //     genSalt(10, (err, salt) => {
        //         hash(text, salt, function(err, hash) {
        //             if(err) {
        //                 reject(err);
        //             }
        //             resolve(hash);
        //         });
        //     });
        // })
    }
}
