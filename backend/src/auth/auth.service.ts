import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {}

	private async signToken(userId: number, name: string) {
		const payload = { sub: userId, name }
		const token = await this.jwt.signAsync(payload, {
			expiresIn: '15m',
			secret: process.env.JWT_SECRET
		})

		return {
			access_token: token
		}
	}

	async signup(dto: AuthDto) {
		const userExists = await this.prisma.user.findUnique({
			where: {
				name: dto.name
			}
		})

		if (userExists) {
			throw new ForbiddenException('Пользователь уже существует!')
		}

		const hash = await bcrypt.hash(dto.password, 10)
		const user = await this.prisma.user.create({
			data: {
				name: dto.name,
				password: hash
			}
		})

		return this.signToken(user.id, user.name)
	}

	async signin(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				name: dto.name
			}
		})

		if (!user) {
			throw new ForbiddenException('Введенные данные некорректны!')
		}
		const passwordMatches = await bcrypt.compare(dto.password, user.password)
		if (!passwordMatches) {
			throw new ForbiddenException('Пароль некорректный!')
		}

		return this.signToken(user.id, user.name)
	}
}
