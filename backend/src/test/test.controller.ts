import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/decorator/get-user.decorator'
import { CreateTestDto } from './dto/create.dto'
import { TestService } from './test.service'

@Controller('tests')
export class TestController {
	constructor(private readonly testService: TestService) {}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	create(@GetUser('id') userId: number, @Body() dto: CreateTestDto) {
		return this.testService.create(userId, dto)
	}
}
