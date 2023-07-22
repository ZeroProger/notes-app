import { FC } from 'react'
import styles from './Button.module.scss'

interface IButton {}

const Button: FC<IButton> = () => {
	return <button className={styles.btn}>Button</button>
}

export default Button
