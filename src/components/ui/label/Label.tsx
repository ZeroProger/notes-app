import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import styles from './Label.module.scss'
import { twMerge } from 'tailwind-merge'
import { FieldError } from 'react-hook-form'

const labelVariants = cva(
	'text-sm font-medium inline-block leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

type Props = { required?: boolean; error?: FieldError }

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
		VariantProps<typeof labelVariants> &
		Props
>(({ className, required, error, ...props }, ref) => (
	<LabelPrimitive.Root
		ref={ref}
		className={twMerge(
			clsx(
				labelVariants(),
				{ [styles.required]: required },
				{ [styles.error]: error?.message?.length && error?.message?.length > 0 },
				className
			)
		)}
		{...props}
	/>
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
