import clsx from 'clsx'
import * as React from 'react'
import { FieldError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: FieldError
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, error, ...props }, ref) => {
		return (
			<>
				<textarea
					className={twMerge(
						clsx(
							'flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-md shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
							className
						)
					)}
					ref={ref}
					{...props}
				/>
				{error?.message?.length && error?.message.length > 0 && (
					<div className="text-sm text-error mt-3">{error.message}</div>
				)}
			</>
		)
	}
)

Textarea.displayName = 'Textarea'

export { Textarea }
