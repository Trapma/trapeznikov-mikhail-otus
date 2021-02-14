 let arr1 = [
   ['a', 'b'],
   ['a', 'c'],
   ['d', 'e']
 ]

 const MaxItemAssociation = function (arr) {

   let accumMax = []
   let accumMid = []
   let accumMin = []
   //создадим цикл для нахождения повторяющихся значений

   for (let i = 0; i < arr.length; i++) {
     const prod = arr[i]
     //console.log(arr[i])

     //создадим подцикл, что бы сравнивать подмассивы между собой
     for (let j = 0; j < arr.length; j++) {
       const prod2 = arr[j]
       //пропускаем одинаковые массивы
       if (prod === prod2) {
         continue
       }
       //Если элемент в prod находится в prod2){запиши значение в accumMax}
       else {
         //запиши в массив accumMax все значения из prod которые встречаются в prod2
         accumMax.push(prod.filter(x => prod2.includes(x)))
       }
     }
   }

   //уберем вложенность массива что бы получить односложный массив из повторяющихся значений
   const accumMaxFlat = accumMax.flat()
   /* console.log(accumMaxFlat) */

   //уберем дубликаты
   const accumMaxSet = [...new Set(accumMaxFlat)]
   /* console.log(accumMaxSet) */

   //найдем значения расположенные в пересекающихся массивах
   for (let i = 0; i < arr.length; i++) {
     const prod = arr[i]
     //если prod элемент пересекается в массиве accumMaxSet
     if (prod.filter(x => accumMaxSet.includes(x)) != 0) {
       accumMid.push(prod.filter(x => !accumMaxSet.includes(x)))
     }
   }
   /* console.log(accumMid) */
   //уберем вложенность и пустые массивы
   const accumMidFlat = accumMid.flat()
   /* console.log(accumMidFlat) */
   //отсортируем массив и сконкатенируем с массивом повторяющихся значений
   accumMidFlat.sort()

   const recomendListType1 = accumMaxSet.concat(accumMidFlat)
   /* console.log(recomendListType1) */

   //найдем список рекомендаций 2, это те значения что не вошли в первый список рекомендаций

   for (let i = 0; i < arr.length; i++) {
     const prod = arr[i]
     //запиши в массив accumMin все значения, которых нет в recomendListType1
     accumMin.push(prod.filter(x => !recomendListType1.includes(x)))

   }
   /* console.log(accumMin) */
   //избавимся от вложенности и пустот в массиве
   const recomendListType2 = accumMin.flat()
   /* console.log(recomendListType2) */

  //  let recomendation = "Список рекомендаций 1: " + recomendListType1 + '\n' + "Список рекомендаций 2: " + recomendListType2

   return recomendListType1
 }

 console.log(MaxItemAssociation(arr1))





