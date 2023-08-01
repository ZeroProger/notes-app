import { EPriority } from '../types'

export const queryStaleTime = 5 * 60 * 1000
export const queryCacheTime = 5 * 60 * 1000
export const queryRetryCount = 1
export const queryRefetchInterval = 1000
export const toastCloseTime = 3000

export const PRIORITY_TO_READ = {
	[EPriority.Any]: 'Любой',
	[EPriority.Low]: 'Низкий',
	[EPriority.Medium]: 'Средний',
	[EPriority.High]: 'Высокий',
}
