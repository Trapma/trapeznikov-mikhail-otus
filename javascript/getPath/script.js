
function getPath(element) {

  //узнаем вложенность дерева

  let domCount = 0;
  let elementThree = element;
  while ((elementThree = elementThree.parentElement)) {
    domCount++;
  }

  //создадим массив в который мы будем собирать данные по поиску
  let accum = [];

  //создадим копию element для цикла
  let elementChildren = element;

  //создадим цикл ограничивающися нашей вложенностью
  for (let i = 0; i < domCount; i++) {

    //выясним сколько соседей у элемента
    let count = 1;

    do {
        //если соседей нет завершим цикл
      if (elementChildren.previousElementSibling == null) {
        break;
      }
      count++;
    } while ((elementChildren = elementChildren.previousElementSibling));

    // console.log(count);
    //если соседей нет запишем в массив
    if (count == 1) {
        //если элемент называется body запишем в массив и завершим цикл
      if (element.tagName == "BODY") {
        accum.unshift(`${element.tagName.toLowerCase()} `);
        // console.log(accum);
        break;
      } else {
        accum.unshift(`> ${element.tagName.toLowerCase()}`);
        // console.log(accum);
        element = element.parentElement;
        continue;
      }
    }
    // добавим в массив первую часть строки
    accum.unshift(` > ${element.tagName.toLowerCase()}:nth-child(${count})`);
    // console.log(accum);

    element = element.parentElement;
    // console.log(element);
  }
  //   console.log(accum);

  let result = accum.join("");
//   console.log(result);
  return result;
}

// getPath(el);

module.exports = getPath;
