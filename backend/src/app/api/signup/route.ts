// app/api/signup/route.ts

import {
	createUser,
	findUserByName,
	generateToken,
	setAuthCookie
} from '@/lib/auth.mock'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { name, password } = body

		if (!name || !password || password.length < 6) {
			return NextResponse.json(
				{ message: 'Name и пароль (минимум 6 символов) обязательны' },
				{ status: 400 }
			)
		}

		// 1. Проверка существования
		if (findUserByName(name)) {
			return NextResponse.json(
				{ message: 'Пользователь с таким name уже существует.' },
				{ status: 409 }
			)
		}

		// 2. Создание пользователя (Mock DB)
		const newUser = await createUser(name, password)

		// 3. Генерация JWT и Куки
		const token = generateToken(newUser.id)
		const cookie = setAuthCookie(token)

		const response = NextResponse.json(
			{
				status: 'success',
				user: newUser
			},
			{ status: 201 }
		)

		response.headers.set('Set-Cookie', cookie)

		return response
	} catch (error) {
		console.error('Signup Error:', error)
		return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
	}
}
