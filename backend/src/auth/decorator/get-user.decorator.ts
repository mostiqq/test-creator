import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUser = createParamDecorator(
	(data: string | undefined, ctx: ExecutionContext) => {
		// Получаем объект запроса из контекста
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const request = ctx.switchToHttp().getRequest()

		// Если мы попросили конкретное поле (например @GetUser('id')), возвращаем только его
		if (data) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
			return request.user ? request.user[data] : null
		}

		// Иначе возвращаем весь объект юзера
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
		return request.user
	}
)
