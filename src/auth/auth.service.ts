import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { signUpDTO } from '../dto/signup.dto';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        //Using JwtService to Create Token
        private jwtService: JwtService
    ) { }


    async signUp(signUpDTO:signUpDTO):Promise<{token:string}> {
        const { name, email, password } = signUpDTO;

        // Hashing the Password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Creating User
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        })

        // Sign helps to generate the token
        // payload is the data that we want to save in the token,here saving the _id of the user

        const token = this.jwtService.sign({ id: user._id })

        return { token }
    }

    async login(loginDTO:LoginDTO):Promise<{token:string}> {
        const {  email, password } = loginDTO;

        const user = await this.userModel.findOne({email});

        if(!user){
            throw new UnauthorizedException('Invalid Email or Password')
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            // throw new UnauthorizedException('Incorrect Password')
            throw new UnauthorizedException('Invalid Email or Password')
        }


        const token = this.jwtService.sign({ id: user._id })

        return { token }

    }
}
