'use client'

import { useGetProfileQuery } from '@/store/auth.api'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function Home() {
	const { data: user, isLoading, isError, isFetching } = useGetProfileQuery()
	const router = useRouter()

	useEffect(() => {
		if (isLoading || isFetching) {
			router.push('/login')
		}
	}, [isLoading, isFetching, router])

	if (isError || !user) {
		return <div>Вы не авторизованы</div>
	}
	return <div>Home</div>
}
