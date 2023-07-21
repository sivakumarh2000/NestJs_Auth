import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO } from '../dto/signup.dto';
import { LoginDTO } from '../dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService:AuthService) {}
  
  @Post('signup')
  signUp(@Body() signUpDTO:signUpDTO):Promise<{token:string}> {
    return this.authService.signUp(signUpDTO)
  }

  @Post('login')
  login(@Body() loginDTO:LoginDTO):Promise<{token:string}> {
    return this.authService.login(loginDTO)
  }


}
