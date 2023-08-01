export type NoteVM = {
	id: number
	title: string
	description: string
	creationTime: string
	changeTime: string
	priority: number
}

export type NewNoteVM = {
	title: string
	description?: string
	priority: number
}

export enum EPriority {
	Any = -1,
	Low = 0,
	Medium = 1,
	High = 2,
}
