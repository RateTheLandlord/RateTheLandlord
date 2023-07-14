import LinkButtonLG from '@/components/ui/link-button-lg'
import LinkButtonLightLG from '@/components/ui/link-button-light-lg'

export default function Custom500() {
	return (
		<main className="mt-2 grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-indigo-600">500</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Oops, something went wrong.
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					An error occurred between somewhere on our end. If you continue to see
					this page, please contact us.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<LinkButtonLG umami="500 / Return Home" href="/">
						Go back home
					</LinkButtonLG>
					<LinkButtonLightLG
						umami="500 / Email"
						href="mailto:r8thelandlord@gmail.com"
					>
						Contact Us
					</LinkButtonLightLG>
				</div>
			</div>
		</main>
	)
}