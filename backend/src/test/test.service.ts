import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateTestDto } from './dto/create.dto'
import { PassTestDto } from './dto/pass.dto'

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

	async getAll() {
		return this.prisma.test.findMany({
			include: {
				results: true
			}
		})
	}

	async deleteTest(userId: number, testId: number) {
		return this.prisma.test.delete({
			where: {
				authorId: userId,
				id: testId
			}
		})
	}

	async passTest(userId: number, testId: number, dto: PassTestDto) {
		const test = await this.prisma.test.findUnique({
			where: {
				id: testId
			},
			include: {
				questions: {
					include: {
						options: true
					}
				}
			}
		})

		if (!test) {
			throw new Error('Тест не найден!')
		}

		let score = 0
		test.questions.forEach(question => {
			const userAnswer = dto.answers.find(a => a.questionId === question.id)
			if (userAnswer) {
				const correctOptionIds = question.options
					.filter(o => o.isCorrect)
					.map(o => o.id)
				const isCorrect =
					userAnswer.selectedOptionIds.length === correctOptionIds.length &&
					userAnswer.selectedOptionIds.every(id =>
						correctOptionIds.includes(id)
					)
				if (isCorrect) {
					score += 10
				}
			}
		})

		return this.prisma.testResult.create({
			data: {
				score,
				userId,
				testId,
				answers: {
					create: dto.answers.map(answer => ({
						question: { connect: { id: answer.questionId } },
						selectedOptions: {
							connect: answer.selectedOptionIds.map(id => ({ id }))
						}
					}))
				}
			},
			include: {
				answers: {
					include: {
						selectedOptions: true
					}
				}
			}
		})
	}

	async getMyResult(userId: number) {
		return this.prisma.testResult.findMany({
			where: { userId },
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				test: {
					select: {
						title: true,
						description: true
					}
				},
				answers: {
					include: {
						question: true,
						selectedOptions: true
					}
				}
			}
		})
	}
}
