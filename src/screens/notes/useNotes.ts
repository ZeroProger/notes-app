import { NotesApiUrls } from '../../config/api.config'
import { NotesService } from '../../services/notes.service'
import { useQuery } from 'react-query'

export const useNotes = () => {
	const queryResult = useQuery(NotesApiUrls.getNotes(), () => NotesService.getNotes(), {
		select: ({ data }) => data,
	})

	return queryResult
}
