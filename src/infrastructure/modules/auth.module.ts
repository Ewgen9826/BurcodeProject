import { Module } from "@nestjs/common";
import { AuthController } from "../../app/api/auth.controller";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { AuthService } from "../../domain/services/auth.service";
import { JwtAuthModule } from "../jwt-auth/jwt.auth.module";
import { CommonModule } from "./common.module";

@Module({
  imports: [
    CommonModule,
    JwtAuthModule.registerAsync({
      useClass: AuthRepository,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthRepository, AuthService],
  exports: [JwtAuthModule, CommonModule],
})
export class AuthModule {}
