import { Loading } from '../../components/loading/Loading'
import { NoteCard } from '../../components/note-card/NoteCard'
import styles from './Note.module.scss'
import { useNote } from './useNote'

export function Note() {
	const { data: note, isLoading, isError } = useNote()

	if (isLoading) return <Loading />

	if (isError) return <div className={styles.notFound}>Ошибка: карточка не найдена.</div>

	if (!note) return <div className={styles.notFound}>Ошибка: карточка не найдена.</div>

	return (
		<div className={styles.note}>
			<NoteCard note={note} isMain />
		</div>
	)
}
