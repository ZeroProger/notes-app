import { PropsWithChildren } from 'react'
import styles from './Home.module.scss'
import { Link } from 'react-router-dom'
import { NotesRouteUrls } from '../../config/url.config'

export const Home = () => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Сервис для управления заметками</div>
			<div className={styles.description}>Создан для наработки навыков работы с API</div>
		</div>
	)
}
