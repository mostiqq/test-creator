import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Login from './Login'

export default async function LoginPage() {
	const cookieStore = await cookies() // В последних версиях Next.js это await
	const token = cookieStore.get('token')

	// Если токен есть — выкидываем на главную
	if (token) {
		redirect('/')
	}
	return <Login />
}
