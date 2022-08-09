import { UserRole } from "~/users/enums/user-role.enum";

export class RegisterInput {
    username: string;
    password: string;
    role: UserRole;
}
