const fs = require('fs')
const path = require('path')
const util = require('util')

const readdir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)

//Папку которую нужно найти
const findFolder = process.argv[2]



async function check(dir) {

    let obj = {
        arrFile: [],
        arrDir: []
    }

    let check = 0

    async function find(dir, obj) {

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

    const root = await find(dir, obj)

    return { root }
}



//проверка на папку
if (findFolder === undefined){
    console.log('Воспользуйтесь командой -- help для детальной информации');
}
if (findFolder === 'help') {
    console.log(`
    что бы узнать информацию по функции используйте -- info
    что бы воспользоваться функцией используйте -- nameFolder`);
}
if(findFolder === 'info'){
    console.log(`Функция просматривает папку и выводит массивы папок и файлов в виде одного объекта`);
}
if (findFolder !== 'help' && (findFolder !== undefined) && (findFolder !== 'info')) {
    fs.readdir(findFolder, (err, files) => {
        if (err) throw Error('Не правильный путь папки')

        if (files.length - 1 > 0) {
            check(findFolder).then(result => console.log(result))
        }

    })

}
