import { Loading } from '../../components/loading/Loading'
import { NoteCard } from '../../components/note-card/NoteCard'
import styles from './Note.module.scss'
import { useFetchNote } from '../../queries/notes'
import { useParams } from 'react-router-dom'
import { Error } from '../../components/error/Error'
import { NotFound } from '../../components/not-found/NotFound'

export function Note() {
	const { noteId } = useParams()
	const { data: note, isLoading, isError } = useFetchNote(noteId!)

	if (isLoading) return <Loading />

	if (isError) return <Error message="Ошибка: заметка не найдена." />

	if (!note) return <NotFound message="Заметка не найдена." />

	return (
		<div className={styles.note}>
			<NoteCard note={note} isMain />
		</div>
	)
}
