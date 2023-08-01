import styles from './NotFound.module.scss'

export function NotFound({ message }: { message: string }) {
	return (
		<div className={styles.container}>
			<p className={styles.text}>{message}</p>
		</div>
	)
}
