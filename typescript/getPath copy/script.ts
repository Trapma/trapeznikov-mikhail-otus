function getPath(element: {
  parentElement: any;
  tagName: string;
  previousElementSibling: string
}) {
  //узнаем вложенность дерева

  let domCount: number = 0;
  let domElement: any = element;
  while ((domElement = domElement.parentElement)) {
    domCount++;
  }

  //создадим массив в который мы будем собирать данные по поиску

  let accum:Array<string> = []
  //создадим копию element для цикла

  let copyElement: any = element;

  //создадим цикл ограничивающися нашей вложенностью

  for (let i:number = 0; i < domCount; i++) {
    //выясним сколько соседей у элемента

    let count:number = 1;

    do {
      //если соседей нет завершим цикл

      if (copyElement.previousElementSibling === null) {
        break;
      }

      count++;
    } while ((copyElement = copyElement.previousElementSibling));

    //если соседей нет запишем в массив

    if (count === 1) {
      //если элемент называется body запишем в массив и завершим цикл

      if (element.tagName === "BODY") {
        accum.unshift(`${element.tagName.toLowerCase()} `);
        break;
      }
      //иначе просто добавим в массив и продолжем итерацию
      else {
        accum.unshift(`> ${element.tagName.toLowerCase()}`);
        element = element.parentElement;
        continue;
      }
    }

    // добавим в массив часть строки

    accum.unshift(` > ${element.tagName.toLowerCase()}:nth-child(${count})`);

    // поднимемся вверх по дереву
    element = element.parentElement;
  }

  let result = accum.join("");
  return result;
}

module.exports = getPath;
