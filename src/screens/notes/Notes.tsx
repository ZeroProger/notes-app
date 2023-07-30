import { Link } from 'react-router-dom'
import styles from './Notes.module.scss'
import { useFetchNotes } from '../../queries/notes'
import { NotesRouteUrls } from '../../config/url.config'
import { NoteCard } from '../../components/note-card/NoteCard'
import { Loading } from '../../components/loading/Loading'

export function Notes() {
	const { data: notes, isLoading, isError } = useFetchNotes()

	if (isLoading) return <Loading />

	if (isError) return <div className={styles.notFound}>Ошибка: карточки не найдена.</div>

	if (!notes) return <div className={styles.notFound}>Ошибка: карточки не найдена.</div>

	return (
		<div className={styles.notes}>
			{notes.map((note) => (
				<Link to={NotesRouteUrls.getNote(note.id)} key={note.id} className={styles.note}>
					<NoteCard note={note} />
				</Link>
			))}
		</div>
	)
}
