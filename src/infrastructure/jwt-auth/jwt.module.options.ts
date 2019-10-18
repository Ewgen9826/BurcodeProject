import { UserSearch } from "./user-repository.validate.";
import { Type } from "@nestjs/common";
import { ModuleMetadata } from "@nestjs/common/interfaces";

export interface JwtAuthModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  useExisting?: Type<UserSearch>;
  useClass?: Type<UserSearch>;
  // useFactory?: (...args: any[]) => Promise<IAuthModuleOptions> | IAuthModuleOptions;
  // inject?: any[];
}
