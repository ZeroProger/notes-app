import styles from './NoteCard.module.scss'
import { EPriority, NoteVM } from '../../types'
import { Link, useNavigate } from 'react-router-dom'
import { NotesRouteUrls } from '../../config/url.config'
import clsx from 'clsx'
import { useDeleteNote } from '../../queries/notes'
import { toast } from 'react-toastify'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../../components/ui/alert-dialog/AlertDialog.tsx'
import { twMerge } from 'tailwind-merge'
import { PRIORITY_TO_READ } from '../../config/constants.ts'

export function NoteCard({ note, isMain = false }: { note: NoteVM; isMain?: boolean }) {
	const deleteMutation = useDeleteNote()
	const navigate = useNavigate()

	const handleDeleteNote = () => {
		deleteMutation.mutateAsync(note.id, {
			onError: () => {
				toast.error('Ошибка удаления заметки')
			},
			onSuccess: () => {
				toast.success('Заметка удалена')
				navigate(NotesRouteUrls.getNotes())
			},
		})
	}

	const dateFormatOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'short',
		weekday: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}

	const formattedCreationTime = new Date(note.creationTime).toLocaleDateString(
		'ru',
		dateFormatOptions
	)
	const formattedChangeTime = new Date(note.changeTime).toLocaleDateString('ru', dateFormatOptions)

	return (
		<div className={clsx(styles.noteCard, { [styles.miniCard]: isMain })}>
			<div className={twMerge(clsx({ [styles.title]: true }, 'text-lg', { 'text-2xl': !isMain }))}>
				{isMain && <p>Название:</p>}
				<h3>{note.title}</h3>
			</div>
			<div className={styles.description}>
				{isMain && <p>Описание:</p>}
				<p>{note.description}</p>
			</div>
			<div className={styles.priority}>
				{isMain && <p>Приоритет:</p>}
				<span className={`priority${note.priority}`}>
					{PRIORITY_TO_READ[note.priority as EPriority]}
				</span>
			</div>
			{isMain && note.creationTime !== null && (
				<div className={styles.date}>
					<p>Дата создания:</p>
					<span>{formattedCreationTime}</span>
				</div>
			)}
			{isMain && note.changeTime !== null && (
				<div className={styles.date}>
					<p>Дата изменения:</p>
					<span>{formattedChangeTime}</span>
				</div>
			)}
			<div className={styles.actions}>
				<Link to={NotesRouteUrls.updateNote(note.id)} className={styles.editBtn}>
					Изменить
				</Link>
				{isMain && (
					<AlertDialog>
						<AlertDialogTrigger>
							<button className={styles.deleteBtn}>Удалить</button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className="text-xl">
									Вы уверены что хотите удалить заметку?
								</AlertDialogTitle>
								<AlertDialogDescription className="text-lg">
									Это действие нельзя отменить. Это действие навсегда удалит заметку с наших
									серверов.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel className="btn-default bg-lightGray w-max">
									Отмена
								</AlertDialogCancel>
								<AlertDialogAction className="btn-error w-max" onClick={handleDeleteNote}>
									Удалить
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</div>
		</div>
	)
}
