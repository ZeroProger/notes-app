import { Loading } from '../../components/loading/Loading'
import { NoteCard } from '../../components/note-card/NoteCard'
import styles from './Note.module.scss'
import { useFetchNote } from '../../queries/notes'
import { useParams } from 'react-router-dom'

export function Note() {
	const { noteId } = useParams()
	const { data: note, isLoading, isError } = useFetchNote(noteId!)

	if (isLoading) return <Loading />

	if (isError) return <div className={styles.notFound}>Ошибка: заметка не найдена.</div>

	if (!note) return <div className={styles.notFound}>Ошибка: заметка не найдена.</div>

	return (
		<div className={styles.note}>
			<NoteCard note={note} isMain />
		</div>
	)
}
