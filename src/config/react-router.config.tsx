import React from 'react'
import { RouteObject } from 'react-router-dom'
import { NotesPage } from '../routes/notes'
import { CreateNotePage } from '../routes/notes/create'
import { NotePage } from '../routes/notes/note'
import { UpdateNotePage } from '../routes/notes/note/update'
import { HomePage } from '../routes/home'
import { ErrorPage } from '../routes/error'
import { LayoutPage } from '../routes/layout'

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
		element: <LayoutPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
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
