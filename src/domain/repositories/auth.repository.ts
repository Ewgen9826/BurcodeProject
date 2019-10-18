import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../entities/user.enitty";
import { CustomLogger } from "../../infrastructure/logger/custom-logger.service";
import { UserSearch } from "src/infrastructure/jwt-auth/user-repository.validate.";

@Injectable()
export class AuthRepository implements UserSearch {
  private readonly logger = new CustomLogger("AuthRepository");
  public readonly users: User[] = [
    {
      userName: "User1",
      password: "password1",
    },
    {
      userName: "User2",
      password: "password2",
    },
  ];

  getUserbyUserName(userName: string): User {
    const user = this.users.find(u => u.userName === userName);
    if (!user) {
      const errorMessage = `User ${userName} not Exist`;
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }
    return user;
  }
}
