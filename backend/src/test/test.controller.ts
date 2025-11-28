import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/decorator/get-user.decorator'
import { CreateTestDto } from './dto/create.dto'
import { PassTestDto } from './dto/pass.dto'
import { TestService } from './test.service'

@Controller('tests')
export class TestController {
	constructor(private readonly testService: TestService) {}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	create(@GetUser('id') userId: number, @Body() dto: CreateTestDto) {
		return this.testService.create(userId, dto)
	}

	@Post('pass/:testId')
	@UseGuards(AuthGuard('jwt'))
	passTest(
		@GetUser('id') userId: number,
		@Body() dto: PassTestDto,
		@Param('testId') testId: string
	) {
		return this.testService.passTest(userId, Number(testId), dto)
	}

	@UseGuards(AuthGuard('jwt'))
	@Get()
	getAll() {
		return this.testService.getAll()
	}

	@UseGuards(AuthGuard('jwt'))
	@Get('my-results')
	getMyResults(@GetUser('id') userId: number) {
		return this.testService.getMyResult(userId)
	}

	@Delete(':id')
	@UseGuards(AuthGuard('jwt'))
	@HttpCode(200)
	deleteTest(@GetUser('id') userId: number, @Param('id') id: string) {
		return this.testService.deleteTest(userId, Number(id))
	}
}
