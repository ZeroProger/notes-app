import styles from './Error.module.scss'

export function Error({ message }: { message: string }) {
	return (
		<div className={styles.container}>
			<p className={styles.text}>{message}</p>
		</div>
	)
}
