import { useParams } from 'react-router-dom'
import { Loading } from '../../../components/loading/Loading'
import { NoteForm } from '../../../components/note-form/NoteForm'
import { Heading } from '../../../components/ui/heading/Heading'
import { useFetchNote } from '../../../queries/notes'
import styles from './UpdateNote.module.scss'

export function UpdateNote() {
	const { noteId } = useParams()
	const { data: note, isLoading, isError } = useFetchNote(noteId!)

	if (isLoading) return <Loading />

	if (isError) return <div className={styles.notFound}>Ошибка: заметка не найдена.</div>

	if (!note) return <div className={styles.notFound}>Ошибка: заметка не найдена.</div>

	return (
		<div className={styles.container}>
			<Heading title="Изменение заметки" className={styles.heading} />
			<NoteForm defaultNote={note} />
		</div>
	)
}
