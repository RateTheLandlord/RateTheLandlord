import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(req: NextRequest) {
	if (
		req.nextUrl.pathname.startsWith('/_next') ||
		req.nextUrl.pathname.includes('/api/') ||
		PUBLIC_FILE.test(req.nextUrl.pathname)
	) {
		return
	}

	if (req.nextUrl.locale === 'en-CA') {
		return NextResponse.redirect(new URL(`/en${req.nextUrl.pathname}`, req.url))
	}
}
