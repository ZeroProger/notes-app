import { EPriority } from '../../../types'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select/Select'
import { useContext } from 'react'
import { FiltersContext } from '../../../screens/notes/Notes'
import { PRIORITY_TO_READ } from '../../../config/constants'

export function SelectPriorityFilter() {
	const { setPriorityFilter } = useContext(FiltersContext)

	return (
		<div className="flex flex-col gap-2">
			<p className="text-xl text-center md:text-start">Приоритет</p>
			<Select
				onValueChange={(priority) => {
					parseInt(priority) === EPriority.Any
						? setPriorityFilter(null)
						: setPriorityFilter(parseInt(priority))
				}}
				defaultValue={String(EPriority.Any)}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Приоритет" />
				</SelectTrigger>
				<SelectContent className="z-5 bg-lightGray">
					<SelectGroup>
						<SelectItem value={String(EPriority.Any)}>{PRIORITY_TO_READ[EPriority.Any]}</SelectItem>
						<SelectItem value={String(EPriority.Low)}>{PRIORITY_TO_READ[EPriority.Low]}</SelectItem>
						<SelectItem value={String(EPriority.Medium)}>
							{PRIORITY_TO_READ[EPriority.Medium]}
						</SelectItem>
						<SelectItem value={String(EPriority.High)}>
							{PRIORITY_TO_READ[EPriority.High]}
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}
