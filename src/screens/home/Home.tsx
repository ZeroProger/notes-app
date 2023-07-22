import { PropsWithChildren } from 'react'
import styles from './Home.module.scss'
import { Link } from 'react-router-dom'
import { NotesRouteUrls } from '../../config/url.config'

export const Home = ({ children }: PropsWithChildren) => {
	return (
		<div className={styles.container}>
			<header>
				<nav>
					<ul>
						<li>
							<Link to={NotesRouteUrls.getNotes()}>Все заметки</Link>
						</li>
						<li>
							<Link to={NotesRouteUrls.createNote()}>Создать заметку</Link>
						</li>
					</ul>
				</nav>
			</header>
			<main>{children}</main>
		</div>
	)
}
