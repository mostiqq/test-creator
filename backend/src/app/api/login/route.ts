// app/api/login/route.ts

import {
	comparePassword,
	findUserByName,
	generateToken,
	MockUser,
	setAuthCookie
} from '@/lib/auth.mock'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { name, password } = body

		// 1. Поиск пользователя (Mock DB)
		const user: MockUser | undefined = findUserByName(name)

		if (!user || !(await comparePassword(password, user.passwordHash))) {
			return NextResponse.json(
				{ message: 'Неверный name или пароль' },
				{ status: 401 }
			)
		}

		// 2. Генерация JWT и Куки
		const token = generateToken(user.id)
		const cookie = setAuthCookie(token)

		// 3. Возвращаем только безопасные данные
		const { passwordHash, ...userSafe } = user

		const response = NextResponse.json(
			{
				status: 'success',
				user: userSafe
			},
			{ status: 200 }
		)

		response.headers.set('Set-Cookie', cookie)

		return response
	} catch (error) {
		console.error('Login Error:', error)
		return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
	}
}
