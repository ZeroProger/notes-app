import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './NoteForm.module.scss'
import { EPriority, NewNoteVM, NoteVM } from '../../types'
import { Label } from '../../components/ui/label/Label'
import { Input } from '../../components/ui/input/Input'
import { Textarea } from '../../components/ui/textarea/Textarea'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group/RadioGroup'
import { useCreateNote, useUpdateNote } from '../../queries/notes'
import { useNavigate } from 'react-router-dom'
import { NotesRouteUrls } from '../../config/url.config'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

export function NoteForm({ defaultNote }: { defaultNote?: NoteVM }) {
	const formSchema = z.object({
		title: z.string({ required_error: 'Укажите заголовок' }).min(5, {
			message: 'Заголовок должен быть минимум 5 символов в длину.',
		}),
		description: z.string().optional(),
		priority: z.string({ required_error: 'Укажите приоритет' }).min(1, {
			message: 'Укажите приоритет',
		}),
	})

	type ZodNewNoteVM = z.infer<typeof formSchema>

	const {
		handleSubmit,
		control,
		reset,
		watch,
		formState: { errors },
	} = useForm<ZodNewNoteVM>({ mode: 'onChange', resolver: zodResolver(formSchema) })

	const createMutation = useCreateNote()
	const updateMutation = useUpdateNote()
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<ZodNewNoteVM> = (data) => {
		if (defaultNote) {
			updateMutation.mutateAsync(
				{
					id: defaultNote.id,
					dto: {
						...data,
						priority: Number(data.priority),
					},
				},
				{
					onSettled: () => {
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
				onSettled: () => {
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
					defaultValue={defaultNote?.title}
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
					defaultValue={defaultNote?.description}
					render={({ field }) => (
						<Textarea
							{...field}
							id="description"
							placeholder="Описание"
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
						defaultValue={defaultNote ? String(defaultNote.priority) : ''}
						render={({ field }) => (
							<RadioGroup
								onValueChange={field.onChange}
								defaultValue={field.value}
								error={errors.priority}
							>
								<div className={styles.radioItem}>
									<RadioGroupItem
										value="0"
										id="priority-0"
										className="text-primary border-primary"
									/>
									<Label htmlFor="priority-0" className="text-primary">
										{EPriority[0]}
									</Label>
								</div>
								<div className={styles.radioItem}>
									<RadioGroupItem
										value="1"
										id="priority-1"
										className="text-yellow-700 border-yellow-700"
									/>
									<Label htmlFor="priority-1" className="text-yellow-700">
										{EPriority[1]}
									</Label>
								</div>
								<div className={styles.radioItem}>
									<RadioGroupItem value="2" id="priority-2" className="text-error border-error" />
									<Label htmlFor="priority-2" className="text-error">
										{EPriority[2]}
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
					value={defaultNote ? 'Изменить' : 'Создать'}
					className={styles.submitBtn}
					onClick={() => console.log(watch('priority'))}
				/>
			</div>
		</form>
	)
}
