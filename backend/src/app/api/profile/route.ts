// app/api/profile/route.ts

import { protect } from '@/lib/protect'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const authResult = await protect(req)

	if (authResult.error) {
		return authResult.error
	}

	const user = authResult.user

	return NextResponse.json(
		{
			status: 'success',
			message: 'Это защищенная информация (Моковая система).',
			user
		},
		{ status: 200 }
	)
}
