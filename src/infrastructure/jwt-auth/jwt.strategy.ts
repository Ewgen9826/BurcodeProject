import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt.payload";
import { UserSearch } from "./user-repository.validate.";
import { ConfigService } from "../config/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject("UserSearch") private readonly userSearch: UserSearch,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.environment.jwtSecret,
    });
  }

  validate(payload: JwtPayload) {
    const user = this.userSearch.getUserbyUserName(payload.userName);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
