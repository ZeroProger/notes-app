import { PrioritySorting } from './PrioritySorting'
import styles from './Sorting.module.scss'

export function Sorting() {
	return (
		<div className={styles.container}>
			<span className={styles.heading}>Сортировка</span>
			<div className={styles.sorts}>
				<PrioritySorting />
			</div>
		</div>
	)
}
