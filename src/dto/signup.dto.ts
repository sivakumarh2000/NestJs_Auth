import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class signUpDTO {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail({}, { message: "Please Enter Correct Email" })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;


}