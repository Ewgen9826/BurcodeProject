import { Injectable } from "@nestjs/common";
import { AuthOptionsFactory, IAuthModuleOptions } from "@nestjs/passport";

@Injectable()
export class PassportOptionsService implements AuthOptionsFactory {
  createAuthOptions(): Promise<IAuthModuleOptions> | IAuthModuleOptions {
    return { defaultStrategy: "jwt" };
  }
}
