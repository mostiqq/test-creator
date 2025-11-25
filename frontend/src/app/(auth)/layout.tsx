import AuthHeader from '@/components/auth-header/AuthHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Test Creator | Auth',
	description: 'Web application for creating and sharing the tests'
}

export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='main'>
			<AuthHeader />
			{children}
		</div>
	)
}
