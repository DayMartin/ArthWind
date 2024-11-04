import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MusicosService } from 'src/musicos/musicos.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly musicosService: MusicosService,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, senha: string) {
        const user = await this.musicosService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Músico não encontrado');
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Senha incorreta');
        }

        const payload = { id: user.id, email: user.email, type: user.type};
        const token = this.jwtService.sign(payload);
        
        return {
            message: 'Login bem-sucedido',
            token,
            user: { id: user.id, email: user.email, nome: user.fullName, type: user.type},
        };
    }
}
