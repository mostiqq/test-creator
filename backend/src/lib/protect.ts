// lib/protect.ts

import { findUserById, MockUser } from '@/lib/auth.mock'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET_KEY: string =
	process.env.JWT_SECRET_KEY || 'default-secret-key-for-dev'

// Определяем возвращаемый тип для функции protect
interface AuthResult {
	user: Omit<MockUser, 'passwordHash'> | null
	error: NextResponse | null
}

export const protect = async (req: NextRequest): Promise<AuthResult> => {
	const token: string = req.cookies.get('token')?.value || ''

	if (!token) {
		return {
			error: NextResponse.json(
				{ message: 'Доступ запрещен. Необходима авторизация.' },
				{ status: 401 }
			),
			user: null
		}
	}

	try {
		// 1. Проверка и декодирование токена
		const decoded = jwt.verify(token, JWT_SECRET_KEY) as { id: string }
		const userId: string = decoded.id

		// 2. Поиск пользователя в Mock DB по ID
		const currentUser: MockUser | undefined = findUserById(userId)

		if (!currentUser) {
			return {
				error: NextResponse.json(
					{ message: 'Пользователь не найден.' },
					{ status: 401 }
				),
				user: null
			}
		}

		// 3. Возвращаем только безопасные данные
		const { passwordHash, ...userSafe } = currentUser

		return { user: userSafe, error: null }
	} catch (error) {
		console.error('JWT Verification Error:', error)
		return {
			error: NextResponse.json(
				{ message: 'Недействительный токен. Пожалуйста, войдите снова.' },
				{ status: 401 }
			),
			user: null
		}
	}
}
