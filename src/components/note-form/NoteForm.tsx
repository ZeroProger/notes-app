import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './NoteForm.module.scss'
import { EPriority, NoteVM } from '../../types'
import { Label } from '../../components/ui/label/Label'
import { Input } from '../../components/ui/input/Input'
import { Textarea } from '../../components/ui/textarea/Textarea'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group/RadioGroup'
import { useCreateNote, useUpdateNote } from '../../queries/notes'
import { useNavigate } from 'react-router-dom'
import { NotesRouteUrls } from '../../config/url.config'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { PRIORITY_TO_READ } from '../../config/constants'

export function NoteForm({ defaultNote }: { defaultNote?: NoteVM }) {
	const formSchema = zod.object({
		title: zod.string({ required_error: 'Укажите заголовок' }).trim().min(5, {
			message: 'Заголовок должен быть минимум 5 символов в длину.',
		}),
		description: zod.string().trim().optional(),
		priority: zod.string({ required_error: 'Укажите приоритет' }).min(1, {
			message: 'Укажите приоритет',
		}),
	})

	type ZodNewNoteVM = zod.infer<typeof formSchema>

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ZodNewNoteVM>({ mode: 'onChange', resolver: zodResolver(formSchema) })

	const createMutation = useCreateNote()
	const updateMutation = useUpdateNote()
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<ZodNewNoteVM> = (data) => {
		if (defaultNote !== undefined) {
			updateMutation.mutateAsync(
				{
					id: defaultNote.id,
					dto: {
						...data,
						priority: Number(data.priority),
					},
				},
				{
					onError: () => {
						toast.error('Ошибка изменения заметки')
					},
					onSuccess: () => {
						toast.success('Заметка успешно изменена')
						navigate(NotesRouteUrls.getNote(defaultNote.id))
					},
				}
			)
			return
		}

		createMutation.mutateAsync(
			{
				...data,
				priority: Number(data.priority),
			},
			{
				onError: () => {
					toast.error('Ошибка создания заметки')
				},
				onSuccess: () => {
					toast.success('Заметка успешно создана')
					navigate(NotesRouteUrls.getNotes())
				},
			}
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.field}>
				<Label htmlFor="title" className="mb-2" required error={errors.title}>
					Заголовок
				</Label>
				<Controller
					name="title"
					control={control}
					defaultValue={defaultNote?.title || ''}
					render={({ field }) => (
						<Input {...field} type="text" id="title" placeholder="Заголовок" error={errors.title} />
					)}
				/>
			</div>
			<div className={styles.field}>
				<Label htmlFor="description" className="mb-2" error={errors.description}>
					Описание
				</Label>
				<Controller
					name="description"
					control={control}
					defaultValue={defaultNote?.description || ''}
					render={({ field }) => (
						<Textarea
							{...field}
							id="description"
							placeholder="Описание"
							className="resize-none min-h-[150px]"
							error={errors.description}
						/>
					)}
				/>
			</div>
			<div className={styles.field}>
				<Label className="mb-4" required error={errors.priority}>
					Приоритет
				</Label>
				<div className={styles.radioGroup}>
					<Controller
						name="priority"
						control={control}
						defaultValue={defaultNote !== undefined ? String(defaultNote.priority) : ''}
						render={({ field }) => (
							<RadioGroup
								onValueChange={field.onChange}
								defaultValue={field.value}
								error={errors.priority}
							>
								<div className={styles.radioItem}>
									<RadioGroupItem
										value={String(EPriority.Low)}
										id="priority-0"
										className="text-primary border-primary"
									/>
									<Label htmlFor="priority-0" className="text-primary">
										{PRIORITY_TO_READ[EPriority.Low]}
									</Label>
								</div>
								<div className={styles.radioItem}>
									<RadioGroupItem
										value={String(EPriority.Medium)}
										id="priority-1"
										className="text-yellow-700 border-yellow-700"
									/>
									<Label htmlFor="priority-1" className="text-yellow-700">
										{PRIORITY_TO_READ[EPriority.Medium]}
									</Label>
								</div>
								<div className={styles.radioItem}>
									<RadioGroupItem
										value={String(EPriority.High)}
										id="priority-2"
										className="text-error border-error"
									/>
									<Label htmlFor="priority-2" className="text-error">
										{PRIORITY_TO_READ[EPriority.High]}
									</Label>
								</div>
							</RadioGroup>
						)}
					/>
				</div>
			</div>
			<div className={styles.field}>
				<Input
					type="submit"
					value={defaultNote !== undefined ? 'Изменить' : 'Создать'}
					className={styles.submitBtn}
				/>
			</div>
		</form>
	)
}
