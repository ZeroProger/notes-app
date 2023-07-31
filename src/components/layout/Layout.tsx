import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { NotesRouteUrls } from '../../config/url.config'
import styles from './Layout.module.scss'

export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className={styles.container}>
			<header>
				<nav>
					<ul>
						<li>
							<Link to={'/'}>Главная</Link>
						</li>
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
