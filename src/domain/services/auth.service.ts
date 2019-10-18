import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "../dtos/auth/sign-in.dto";
import { AuthRepository } from "../repositories/auth.repository";
import { JwtPayload } from "../../infrastructure/jwt-auth/jwt.payload";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ accessToken }> {
    const user = this.authRepository.getUserbyUserName(signInDto.username);
    if (user.password !== signInDto.password) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { userName: user.userName };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
