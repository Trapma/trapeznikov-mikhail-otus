import path = require("path");
import fs = require("fs");


/**
 * 1) зайти в папку и просмотреть все файлы
 * 2) добавить файлы в массив arrFiles, а папки в arrFolders
 * 3) если есть папки, зайти в каждую рекурсивно и повторить пункты 1 и 2
 */

//стартовая папка которую нужно обработать
let startPath = process.argv[2];

//полный путь стартовой папки
let fullPath = path.join(__dirname + "/" + startPath);

//тестовый путь
let test = "src";

//создадим массивы для записи файлов и папок
//мне нужна функция которая отсортирует файлы и папки, а затем вернет готовый результат

function root(dir: string) {
  let arrFile: string[] = [];
  let arrDir: string[] = [];

  //счетчик для отслеживания рекурсии
  let countTree = 0;

  async function recFunc(dir: string) {
    const copyCountTree = countTree;
    // console.log('test start recFunc');

    //читаем папку
    await fs.readdir(dir, async (err, files) => {
      if (err) {
        throw new Error("READDIR_ERROR");
      }

      if (files === undefined) {
        console.log("files === undefined");
        return console.log({ arrFile, arrDir });
      }
      // console.log(files);

      await files.forEach( (el, i) => {
        //для каждого файла мы должны создать путь, который будет принимать функция стат
        let pathEl = path.join(dir, el);
        // console.log("проверка счетчиков. CopyCountTree = " + copyCountTree + ", CountTree = " + countTree);

        // console.log("files.forEach, el = ", pathEl);

        fs.stat(pathEl, async (err, stats) => {
          if (err) {
            throw new Error("STAT_ERROR");
          }

          if (stats.isFile()) {
            // arrFile = [...arrFile, pathEl];
            await arrFile.push(pathEl)
            if (i === files.length - 1 && copyCountTree === countTree) {
              console.log(`i = ${i}, files.length -1 = ${files.length-1} && copyCountTree = ${copyCountTree}, countTree = ${countTree}`);

              let result = JSON.stringify({ arrFile, arrDir });
              return console.log(result);

            }
            // console.log(arrFile);
          }
          if (stats.isDirectory()) {
            // arrDir = [...arrDir, pathEl];
            await arrDir.push(pathEl)
            countTree++;
             await recFunc(pathEl)
          }
        });
      });
    });
  }
  recFunc(dir);
  setTimeout(() => {
    console.log('setTimeout',JSON.stringify({ arrFile, arrDir }));
  }, 500);
}
root(test);



module.exports = root;