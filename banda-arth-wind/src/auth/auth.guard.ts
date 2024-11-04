import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token não fornecido');
        }

        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }
    }
}
