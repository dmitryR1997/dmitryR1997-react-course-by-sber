import { routes } from './routes'
import { formatDate, formatPrice } from './utils'

console.log(`Дата сборки каталога: ${formatDate(new Date())}`)
console.log(`Цена товара: ${formatPrice(5400)}`)

const { render } = await routes.home()

console.log(render())
