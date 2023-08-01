import styles from './Filters.module.scss'
import { SelectPriorityFilter } from './select/SelectPriorityFilter'

export function Filters() {
	return (
		<div className={styles.container}>
			<p className={styles.heading}>Фильтры</p>
			<div className={styles.filters}>
				<SelectPriorityFilter />
			</div>
		</div>
	)
}
