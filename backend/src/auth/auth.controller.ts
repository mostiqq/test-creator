import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import type { RequestWithUser } from './types/auth.types'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	signup(@Body() dto: AuthDto) {
		return this.authService.signup(dto)
	}

	@Post('signin')
	signin(@Body() dto: AuthDto) {
		return this.authService.signin(dto)
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('me')
	getMe(@Req() req: RequestWithUser) {
		return req.user
	}
}
