
const fs = require('fs')
const path = require('path')
const util = require('util')

const readdir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)


 function check(dir) {

    let obj = {
        arrFile: [],
        arrDir: []
    }

    let check = 0

    async function find (dir, obj) {
        let tree = obj

        const dirInfoArray = await readdir(dir)

        for (const [i, info] of dirInfoArray.entries()) {

            const pathEl = path.join(dir, info)
            const statEl = await stat(pathEl)

            if (statEl.isFile()) {
                tree.arrFile.push(pathEl)
            }
            if (statEl.isDirectory()) {
                tree.arrDir.push(pathEl)
                check++
                await find(pathEl, tree)
            }

            //проверка на окончание всех рекурсий
            if ((check === 0) && (i === dirInfoArray.length - 1)) {
                return tree
            }
            //проверка на окончание новой рекурсии
            if ((check > 0) && (i === dirInfoArray.length - 1)) {
                check--
            }
            //проверка на пустые папки
            if (check > 1) {
                check = 0
            }
        }
    }
    return find(dir, obj)
}

check('src').then(result => console.log(result))
