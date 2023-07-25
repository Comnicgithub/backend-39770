import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const parent = new URL(".", import.meta.url)
const __dirname = dirname(parent.pathname.substring(1))
// Hola nico tal vez no entiendas esto, la verdad que yo tampoco jeje hice lo que pude para hacerlo funcionar

export { __filename, __dirname }
