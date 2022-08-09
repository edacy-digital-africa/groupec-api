import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { getRequestFromContext } from '~/commons/utils';

export const Origin = createParamDecorator((pick: string, context: ExecutionContext) => {
    const req = getRequestFromContext(context);
    const origin = req.originDecorator;
    return origin;
})
