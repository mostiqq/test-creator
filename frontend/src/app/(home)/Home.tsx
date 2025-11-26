'use client'

import { useGetProfileQuery } from '@/store/auth.api'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function Home() {
	const { data: user, isLoading, isError, isFetching } = useGetProfileQuery()
	const router = useRouter()
	useEffect(() => {
		if (!isLoading && !user) {
			router.push('/login')
		}
	}, [isLoading, user, router])
	console.log(user)

	return <div>Home</div>
}
