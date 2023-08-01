import { useParams } from 'react-router-dom'
import { Loading } from '../../../components/loading/Loading'
import { NoteForm } from '../../../components/note-form/NoteForm'
import { Heading } from '../../../components/ui/heading/Heading'
import { useFetchNote } from '../../../queries/notes'
import styles from './UpdateNote.module.scss'
import { Error } from '../../../components/error/Error'
import { NotFound } from '../../../components/not-found/NotFound'

export function UpdateNote() {
	const { noteId } = useParams()
	const { data: note, isLoading, isError } = useFetchNote(noteId!)

	if (isLoading) return <Loading />

	if (isError) return <Error message="Ошибка: заметка не найдена." />

	if (!note) return <NotFound message="Заметка не найдена." />

	return (
		<div className={styles.container}>
			<Heading title="Изменение заметки" className={styles.heading} />
			<NoteForm defaultNote={note} />
		</div>
	)
}
