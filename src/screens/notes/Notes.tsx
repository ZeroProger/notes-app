import { Link } from 'react-router-dom'
import styles from './Notes.module.scss'
import { useFetchNotes } from '../../queries/notes'
import { NotesRouteUrls } from '../../config/url.config'
import { NoteCard } from '../../components/note-card/NoteCard'
import { Loading } from '../../components/loading/Loading'
import { Filters } from '../../components/filters/Filters'
import { createContext, useMemo, useState } from 'react'
import { EPriority } from '../../types'
import { Sorting } from '../../components/sorting/Sorting'
import { Error } from '../../components/error/Error'
import { NotFound } from '../../components/not-found/NotFound'

export const FiltersContext = createContext<{
	priorityFilter: EPriority | null
	setPriorityFilter?: any
	prioritySorting: 'asc' | 'desc'
	setPrioritySorting?: any
}>({
	priorityFilter: null,
	setPriorityFilter: null,
	prioritySorting: 'asc',
	setPrioritySorting: null,
})

export function Notes() {
	const { data: notes, isLoading, isError } = useFetchNotes()
	const [priorityFilter, setPriorityFilter] = useState<EPriority | null>(null)
	const [prioritySorting, setPrioritySorting] = useState<'asc' | 'desc'>('asc')
	const providerValue = useMemo(
		() => ({ priorityFilter, setPriorityFilter, prioritySorting, setPrioritySorting }),
		[priorityFilter, prioritySorting]
	)

	if (isLoading) return <Loading />

	if (isError) return <Error message="Ошибка: заметки не найдены." />

	if (notes === undefined || notes.length === 0)
		return <NotFound message="Пока не добавлено ни одной заметки." />

	const filteredNotes = notes
		.filter((note) => (priorityFilter !== null ? note.priority === priorityFilter : note))
		.sort((a, b) => (prioritySorting === 'asc' ? a.priority - b.priority : b.priority - a.priority))

	return (
		<FiltersContext.Provider value={providerValue}>
			<div className={styles.container}>
				<div className={styles.filters}>
					<Filters />
					<Sorting />
				</div>
				{filteredNotes.length === 0 ? (
					<div className={styles.notesEmpty}>Заметки по данным фильтрам не найдены</div>
				) : (
					<div className={styles.notes}>
						{filteredNotes.map((note) => (
							<Link to={NotesRouteUrls.getNote(note.id)} key={note.id} className={styles.note}>
								<NoteCard note={note} />
							</Link>
						))}
					</div>
				)}
			</div>
		</FiltersContext.Provider>
	)
}
