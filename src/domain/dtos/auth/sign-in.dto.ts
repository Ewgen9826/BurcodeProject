import { ApiModelProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiModelProperty({ required: true })
  username: string;
  @ApiModelProperty({ required: true })
  password: string;
}
