export const NotesRouteUrls = {
	getNotes() {
		return '/notes'
	},

	getNote(id: string | number) {
		return `/notes/${id}`
	},

	createNote() {
		return '/notes/create'
	},

	updateNote(id: string | number) {
		return `/notes/${id}/update`
	},
}
