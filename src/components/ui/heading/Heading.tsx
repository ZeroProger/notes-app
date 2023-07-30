import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export function Heading({
	title,
	className,
	capitalize = false,
}: {
	title: string
	className?: string
	capitalize?: boolean
}) {
	return (
		<h1
			className={twMerge(
				clsx(`text-white font-semibold mb-4 text-3xl`, { capitalize: capitalize }, className)
			)}
		>
			{title}
		</h1>
	)
}
