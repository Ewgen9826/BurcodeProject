import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class CustomLogger extends Logger {
  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);
  }
  log(message: string, context?: string) {
    super.log(message, context);
  }
  debug(message: string, context?: string) {
    super.debug(message, context);
  }
}
