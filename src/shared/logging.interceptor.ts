import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logString = `[${context.switchToHttp().getRequest().method} ${
      context.switchToHttp().getRequest().url
    }] chamando ${context.getClass().name}.${
      context.getHandler().name
    }(). Duração:`;

    const now = Date.now();
    return next.handle().pipe(
      tap(
        () => Logger.log(logString + ` ${Date.now() - now}ms`),
        () => Logger.error('Erro ' + logString + ` ${Date.now() - now}ms`),
      ),
    );
  }
}
