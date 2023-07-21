import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDTO {

    @IsNotEmpty()
    @IsEmail({}, { message: "Please Enter Correct Email" })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;


}