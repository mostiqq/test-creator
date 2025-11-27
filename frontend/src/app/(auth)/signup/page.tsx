import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Signup from './Signup'

export default async function SignupPage() {
	const cookieStore = await cookies() // В последних версиях Next.js это await
	const token = cookieStore.get('token')

	// Если токен есть — выкидываем на главную
	if (token) {
		redirect('/')
	}
	return <Signup />
}
