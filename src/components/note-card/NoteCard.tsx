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

export function NoteCard({ note, isMain = false }: { note: NoteVM; isMain?: boolean }) {
	const deleteMutation = useDeleteNote()
	const navigate = useNavigate()

	const handleDeleteNote = () => {
		deleteMutation.mutateAsync(note.id, {
			onSettled: () => {
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

	return (
		<div className={clsx(styles.noteCard, { [styles.miniCard]: isMain })}>
			<h3 className={twMerge(clsx('text-lg', { 'text-2xl': !isMain }))}>
				{isMain && (
					<div>
						Название:
						<br />
					</div>
				)}
				{note.title}
			</h3>
			<p className={styles.description}>
				{isMain && (
					<div>
						Описание:
						<br />
					</div>
				)}
				{note.description}
			</p>
			<p className={styles.priority}>
				{isMain && (
					<div>
						Приоритет:
						<br />
					</div>
				)}
				<span className={`priority${note.priority}`}>{EPriority[note.priority]}</span>
			</p>
			{isMain && note.creationTime && (
				<p className={styles.date}>
					<div>
						Дата создания:
						<br />
					</div>
					{new Date(note.creationTime).toLocaleDateString('ru', dateFormatOptions)}
				</p>
			)}
			{isMain && note.changeTime && (
				<p className={styles.date}>
					<div>
						Дата изменения:
						<br />
					</div>
					{new Date(note.changeTime).toLocaleDateString('ru', dateFormatOptions)}
				</p>
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
