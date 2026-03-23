import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { resolve } from 'path'

const dist = resolve('dist')

if (!existsSync(`${dist}/icons`)) {
    mkdirSync(`${dist}/icons`, { recursive: true })
}

copyFileSync('manifest.json', `${dist}/manifest.json`)

const icons = ['icon16.png', 'icon48.png', 'icon128.png']
icons.forEach(icon => {
    const src = resolve(`public/icons/${icon}`)
    if (existsSync(src)) {
        copyFileSync(src, `${dist}/icons/${icon}`)
    }
})

console.log('Assets copied to dist/')