import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET || 'super-secret-key'
		})
	}

	// Этот метод вызывается, если токен валиден
	async validate(payload: { sub: number; name: string }) {
		const user = await this.prisma.user.findUnique({
			where: { id: payload.sub }
		})
		// Удаляем пароль из объекта пользователя перед тем, как добавить в Request
		if (!user) return null

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...result } = user
		return result
	}
}
