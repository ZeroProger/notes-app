import { PrioritySorting } from './PrioritySorting'
import styles from './Sorting.module.scss'

export function Sorting() {
	return (
		<div className={styles.container}>
			<p className={styles.heading}>Сортировка</p>
			<div className={styles.sorts}>
				<PrioritySorting />
			</div>
		</div>
	)
}
