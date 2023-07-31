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

export function SelectPriorityFilter() {
	const { priorityFilter, setPriorityFilter } = useContext(FiltersContext)

	return (
		<div className="flex flex-col gap-2">
			<div className="text-xl text-center md:text-start">Приоритет</div>
			<Select
				onValueChange={(priority) => {
					priority === '-1' ? setPriorityFilter(null) : setPriorityFilter(parseInt(priority))
				}}
				defaultValue="-1"
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Приоритет" />
				</SelectTrigger>
				<SelectContent className="z-5 bg-lightGray">
					<SelectGroup>
						<SelectItem value="-1">Любой</SelectItem>
						<SelectItem value="0">{EPriority[0]}</SelectItem>
						<SelectItem value="1">{EPriority[1]}</SelectItem>
						<SelectItem value="2">{EPriority[2]}</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}
