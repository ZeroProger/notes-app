import React from 'react'
import styles from './CreateNote.module.scss'
import { Heading } from '../../../components/ui/heading/Heading'
import { NoteForm } from '../../../components/note-form/NoteForm'

const CreateNote = () => {
	return (
		<div className={styles.container}>
			<Heading title="Создание заметки" className={styles.heading} />
			<NoteForm />
		</div>
	)
}

export default CreateNote
