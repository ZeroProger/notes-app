import { NotesApiUrls } from '../../config/api.config'
import { NotesService } from '../../services/notes.service'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export const useNote = () => {
	const { noteId } = useParams()

	const queryResult = useQuery(
		[NotesApiUrls.getNote(noteId!)],
		() => NotesService.getNote(noteId!),
		{
			select: ({ data }) => data,
			enabled: noteId !== null,
		}
	)

	return queryResult
}
