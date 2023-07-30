import styles from './Filters.module.scss'
import { SelectPriorityFilter } from './select/SelectPriorityFilter'

export function Filters() {
	return (
		<div className={styles.container}>
			<span className={styles.heading}>Фильтры</span>
			<div className={styles.filters}>
				<SelectPriorityFilter />
			</div>
		</div>
	)
}
