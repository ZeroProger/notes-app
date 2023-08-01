import styles from './Home.module.scss'

export const Home = () => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Сервис для управления заметками</div>
			<div className={styles.description}>Создан для наработки навыков работы с API</div>
		</div>
	)
}
