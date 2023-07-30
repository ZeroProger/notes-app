import { EPriority } from '../../types'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select/Select'
import { useContext } from 'react'
import { FiltersContext } from '../../screens/notes/Notes'

export function PrioritySorting() {
	const { prioritySorting, setPrioritySorting } = useContext(FiltersContext)

	return (
		<div className="flex flex-col gap-2">
			<div className="text-xl">Приоритет</div>
			<Select
				onValueChange={(priority) => {
					setPrioritySorting(priority)
				}}
				defaultValue="asc"
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Приоритет" />
				</SelectTrigger>
				<SelectContent className="z-5 bg-lightGray">
					<SelectGroup>
						<SelectItem value="asc">По возрастанию</SelectItem>
						<SelectItem value="desc">По убыванию</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}
