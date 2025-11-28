import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTestDto } from './dto/create.dto'

@Injectable()
export class TestService {
	constructor(private prisma: PrismaService) {}

	async create(userId: number, dto: CreateTestDto) {
		return this.prisma.test.create({
			data: {
				title: dto.title,
				description: dto.description,
				authorId: userId,
				questions: {
					create: dto.questions.map(question => ({
						text: question.text,
						type: question.type,
						options: {
							create: question.options.map(option => ({
								text: option.text,
								isCorrect: option.isCorrect
							}))
						}
					}))
				}
			},
			include: {
				questions: {
					include: {
						options: true
					}
				}
			}
		})
	}
}
