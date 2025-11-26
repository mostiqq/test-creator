import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Home } from './Home'

export default async function HomePage() {
	const cookieStore = await cookies() // В последних версиях Next.js это await
	const token = cookieStore.get('token')

	// Если токен есть — выкидываем на главную
	if (!token) {
		redirect('/login')
	}
	return <Home />
}
