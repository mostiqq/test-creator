// lib/auth-mock.ts

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

// --- Определение типа пользователя (интерфейс) ---
export interface MockUser {
	id: string
	name: string
	passwordHash: string
	createdAt: string
}

const JWT_SECRET_KEY: string =
	process.env.JWT_SECRET_KEY || 'default-secret-key-for-dev'

// --- 1. Моковая "База Данных" (массив пользователей) ---
// Явно указываем, что это массив объектов типа MockUser
const mockUsers: MockUser[] = []

// Функция для добавления тестового пользователя при старте
;(async () => {
	// Пароль: "password123"
	const passwordHash = await bcrypt.hash('password123', 12)
	mockUsers.push({
		id: 'test-uuid-123',
		name: 'test',
		passwordHash: passwordHash,
		createdAt: new Date().toISOString()
	})
	console.log('Mock DB initialized with one user: test')
})()

// --- 2. Функции для работы с данными ---

export const findUserByName = (name: string): MockUser | undefined => {
	// Функция может вернуть объект MockUser или undefined
	return mockUsers.find(u => u.name === name)
}

export const findUserById = (id: string): MockUser | undefined => {
	return mockUsers.find(u => u.id === id)
}

export const createUser = async (
	name: string,
	password: string
): Promise<MockUser> => {
	const passwordHash: string = await bcrypt.hash(password, 12)
	const newUser: MockUser = {
		id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
		name,
		passwordHash: passwordHash,
		createdAt: new Date().toISOString()
	}
	mockUsers.push(newUser)
	return newUser
}

// --- 3. Функции Auth (JWT и Cookie) ---

export const comparePassword = async (
	candidatePassword: string,
	passwordHash: string
): Promise<boolean> => {
	return await bcrypt.compare(candidatePassword, passwordHash)
}

export const generateToken = (userId: string): string => {
	// В jwt.sign явно указываем тип payload
	return jwt.sign({ id: userId }, JWT_SECRET_KEY, {
		expiresIn: '1h' // Срок действия токена
	})
}

export const setAuthCookie = (token: string): string => {
	const maxAge: number = 60 * 60 // 1 час в секундах
	const secure: boolean = process.env.NODE_ENV === 'production'

	// HttpOnly: Защита от XSS
	return `token=${token}; Path=/; HttpOnly; Max-Age=${maxAge}; ${secure ? 'Secure' : ''}`
}
