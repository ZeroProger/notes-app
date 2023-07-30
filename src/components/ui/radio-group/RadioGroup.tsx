'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FieldError } from 'react-hook-form'

type Props = { error?: FieldError }

const RadioGroup = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & Props
>(({ className, error, ...props }, ref) => {
	return (
		<>
			<RadioGroupPrimitive.Root
				className={twMerge(clsx('grid gap-2', className))}
				{...props}
				ref={ref}
			/>
			{error?.message?.length && error?.message.length > 0 && (
				<div className="text-sm text-error mt-3">{error.message}</div>
			)}
		</>
	)
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={twMerge(
				clsx(
					'aspect-square h-4 w-4 rounded-full border border-white text-white shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
					className
				)
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<svg
					stroke="currentColor"
					fill="currentColor"
					strokeWidth="0"
					viewBox="0 0 24 24"
					height="14px"
					width="14px"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
				</svg>
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	)
})

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
