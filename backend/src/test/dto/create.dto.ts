import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator'

// DTO для варианта ответа
class CreateOptionDto {
	@IsString()
	@IsNotEmpty()
	text: string

	@IsBoolean()
	isCorrect: boolean
}

// DTO для вопроса
class CreateQuestionDto {
	@IsString()
	@IsNotEmpty()
	text: string

	@IsEnum(['SINGLE_CHOICE', 'MULTIPLE_CHOICE'])
	type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE'

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOptionDto)
	options: CreateOptionDto[]
}

// ГЛАВНЫЙ DTO
export class CreateTestDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsOptional()
	description?: string

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateQuestionDto)
	questions: CreateQuestionDto[]
}
