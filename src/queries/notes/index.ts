import { NotesService } from '../../services/notes.service'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import { NewNoteVM } from '../../types'
import { NotesRouteUrls } from '../../config/url.config'

export function useFetchNotes() {
	return useQuery(['notes'], () => NotesService.getNotes(), {
		select: (data) => data.data,
	})
}

export function useFetchNote(noteId: string | undefined) {
	return useQuery(['note', NotesRouteUrls.getNote(noteId!)], () => NotesService.getNote(noteId!), {
		select: ({ data }) => data,
		enabled: !!noteId,
	})
}

export function useCreateNote() {
	const queryClient = useQueryClient()

	return useMutation(NotesService.createNote, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(['notes'])
		},
	})
}

export function useUpdateNote() {
	const queryClient = useQueryClient()

	return useMutation(
		(data: { id: number | string; dto: NewNoteVM }) => {
			return NotesService.updateNote(data.id, data.dto)
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries(['notes'])
				await queryClient.invalidateQueries(['note'])
			},
		}
	)
}

export function useDeleteNote() {
	const queryClient = useQueryClient()

	return useMutation(NotesService.deleteNote, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(['notes'])
		},
	})
}
