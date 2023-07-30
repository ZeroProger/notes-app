import clsx from 'clsx'
import * as React from 'react'
import { FieldError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: FieldError
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, error, type, ...props }, ref) => {
		return (
			<>
				<input
					type={type}
					className={twMerge(
						clsx(
							'flex w-full rounded-md border border-input bg-background px-3 py-1 text-md shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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

Input.displayName = 'Input'

export { Input }
