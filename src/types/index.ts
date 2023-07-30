export type Nullable<T> = { [K in keyof T]: T[K] | null }

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
	Низкий,
	Средний,
	Высокий,
}

export type ProblemDetails = Nullable<{
	type: string
	title: string
	status: number
	detail: string
	instance: string
}>
