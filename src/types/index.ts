export type Nullable<T> = { [K in keyof T]: T[K] | null }

export type NoteVM = {
	id: number
	title: string
	description: string
	creationTime: string
	changeTime: string
	priority: number
}

export type NewNoteVM = Pick<NoteVM, 'title' | 'description' | 'priority'>

export enum EPriority {
	Low,
	Medium,
	High,
}

export type ProblemDetails = Nullable<{
	type: string
	title: string
	status: number
	detail: string
	instance: string
}>
