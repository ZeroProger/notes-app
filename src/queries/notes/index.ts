import { NotesService } from '../../services/notes.service'
import { useQueryClient, useMutation, useQuery } from 'react-query'
import { NewNoteVM } from '../../types'

export function useFetchNotes() {
	return useQuery(['notes'], () => NotesService.getNotes(), {
		select: (data) => data.data,
	})
}

export function useCreateNote() {
	const queryClient = useQueryClient()

	return useMutation(NotesService.createNote, {
		onSettled: async () => {
			queryClient.invalidateQueries(['notes'])
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
			onSettled: async () => {
				await queryClient.invalidateQueries({ queryKey: ['notes'] })
			},
		}
	)
}

export function useDeleteNote() {
	const queryClient = useQueryClient()

	return useMutation(NotesService.deleteNote, {
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ['notes'] })
		},
	})
}
