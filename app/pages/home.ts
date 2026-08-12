import { formatDate } from '../utils'

console.log('Загружен модуль страницы home')

export const render = () => `Главная страница, ${formatDate(new Date())}`
