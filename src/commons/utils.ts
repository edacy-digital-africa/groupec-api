import { ExecutionContext } from "@nestjs/common";

export function getRequestFromContext(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
}