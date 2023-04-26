import {writeFileSync} from 'fs'
import {globby} from 'globby'
const homeURL = 'https://ratethelandlord.org'

;(async () => {
	try {
		console.log('generating sitemap..')

		const pages = await globby([
			'pages/**/*.tsx',
			'!pages/_*.tsx',
			'!pages/api',
			'!pages/404.tsx',
			'!pages/login.tsx',
			'!pages/admin/[admin].tsx',
			'!pages/randomstringofchars-create-review',
			'!pages/randomstringofchars-reviews',
		])

		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
							.map((page) => {
								const path = page
									.replace('pages/', '/')
									.replace('.tsx', '')
									.replace('/index', '')
								const route = path === '/index' ? '' : path
								const fullUrl = `${homeURL}${route}`
								console.log(fullUrl)
								return `
                        <url>
                            <loc>${fullUrl}</loc>
                        </url>
                    `
							})
							.join('')}
        </urlset>`

		writeFileSync('public/sitemap.xml', sitemap)
		console.log('sitemap generated')
	} catch (e) {
		console.log(e)
		process.exit(1)
	}
})()
