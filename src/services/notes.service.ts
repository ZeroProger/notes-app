import { axiosClassic } from '../api/config'
import { NotesApiUrls } from '../config/api.config'
import { NewNoteVM, NoteVM } from 'types'

export const NotesService = {
	getNotes() {
		return axiosClassic.get<NoteVM[]>(NotesApiUrls.getNotes())
	},

	getNote(id: number | string) {
		return axiosClassic.get<NoteVM>(NotesApiUrls.getNote(id))
	},

	createNote(dto: NewNoteVM) {
		return axiosClassic.post(NotesApiUrls.createNote(), dto)
	},

	deleteNote(id: number | string) {
		return axiosClassic.delete(NotesApiUrls.deleteNote(id))
	},

	updateNote(id: number | string, dto: NewNoteVM) {
		return axiosClassic.patch(NotesApiUrls.updateNote(id), dto)
	},
}
