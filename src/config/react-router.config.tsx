import React from 'react'
import { RouteObject } from 'react-router-dom'
import { NotesPage } from '../routes/notes'
import { CreateNotePage } from '../routes/notes/create'
import { NotePage } from '../routes/notes/note'
import { UpdateNotePage } from '../routes/notes/note/update'
import { RootRoute } from '../routes'
import { Error } from '../routes/error'

export const RouterPaths = {
	notes() {
		return '/notes'
	},

	note() {
		return 'notes/:noteId'
	},

	createNote() {
		return 'notes/create'
	},

	updateNote() {
		return 'notes/:noteId/update'
	},
}

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <RootRoute />,
		errorElement: <Error />,
		children: [
			{
				path: RouterPaths.notes(),
				element: <NotesPage />,
			},
			{ path: RouterPaths.createNote(), element: <CreateNotePage /> },
			{
				path: RouterPaths.note(),
				element: <NotePage />,
			},
			{ path: RouterPaths.updateNote(), element: <UpdateNotePage /> },
		],
	},
]
