import { Type } from 'class-transformer'
import { IsArray, IsInt, ValidateNested } from 'class-validator'

class AnswerDto {
	@IsInt()
	questionId: number

	@IsArray()
	@IsInt({ each: true }) // Массив ID выбранных ответов [1, 5, 8]
	selectedOptionIds: number[]
}

export class PassTestDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AnswerDto)
	answers: AnswerDto[]
}
