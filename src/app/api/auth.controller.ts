import { Controller, Post, Body, Get, UseGuards } from "@nestjs/common";
import { AuthService } from "../../domain/services/auth.service";
import { SignInDto } from "../../domain/dtos/auth/sign-in.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async post(@Body() signInDto: SignInDto): Promise<{ accessToken }> {
    const token = await this.authService.signIn(signInDto);
    return token;
  }
}
