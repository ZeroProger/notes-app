import styles from './NoteCard.module.scss'
import { EPriority, NoteVM } from '../../types'
import { Link } from 'react-router-dom'
import { NotesRouteUrls } from '../../config/url.config'
import clsx from 'clsx'

export function NoteCard({ note, isMain = false }: { note: NoteVM; isMain?: boolean }) {
	return (
		<div className={clsx(styles.noteCard, { [styles.miniCard]: isMain })}>
			<h3 className={styles.title}>
				{isMain && (
					<div>
						Название:
						<br />
					</div>
				)}
				{note.title}
			</h3>
			<p className={styles.description}>
				{isMain && (
					<div>
						Описание:
						<br />
					</div>
				)}
				{note.description}
			</p>
			<p className={styles.priority}>
				{isMain && (
					<div>
						Приоритет:
						<br />
					</div>
				)}
				<span className={`priority${note.priority}`}>{EPriority[note.priority]}</span>
			</p>
			<Link to={NotesRouteUrls.updateNote(note.id)} className={styles.editBtn}>
				Изменить
			</Link>
		</div>
	)
}
