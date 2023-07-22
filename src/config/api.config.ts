export const API_URL = `${process.env.APP_URL}`
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}`

export const NotesApiUrls = {
	getNotes() {
		return '/notes'
	},

	getNote(id: string | number) {
		return `/notes/${id}`
	},

	createNote() {
		return '/notes/create'
	},

	deleteNote(id: string | number) {
		return `/notes/delete/${id}`
	},

	updateNote(id: string | number) {
		return `/notes/update/${id}`
	},
}
