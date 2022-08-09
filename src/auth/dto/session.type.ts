import { ApiProperty } from "@nestjs/swagger";
import { User } from "~/users/dto/user.entity";
import { IUser } from "~/users/interfaces/user.interface";

export class Session {
    @ApiProperty({ type: User })
    user: IUser;

    @ApiProperty()
    token: string;
}
