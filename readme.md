# Homework GraphQL

### Задача
**Часть 1.**
Написать схему GraphQL для примера веб-приложения e-commerce shop:
- написать минимум 3 сущности, можно больше.
    - какие сущности
    - какие у них поля
    - какие поля обязательные, а какие нет
- написать минимум 4 запроса/мутации, можно больше.


**Часть 2**.
- развернуть локально graphQL + nodejs
- или воспользоваться одним из веб демо (graphqlbin),
- перенести полностью или частично написанную в Части 1 схему.

Результатом работы будет ссылка на онлайн демо или репозиторий.

### Установка

Скачать репозиторий через [github](https://github.com/Trapma/trapeznikov-mikhail-otus/tree/graphQl)

или если установлен git:
-  воспользоваться командой clone в терминале:
`git clone https://github.com/Trapma/trapeznikov-mikhail-otus.git`

**Переход на ветку graphQL**

- перейти в папку с помощью команды:
    `cd trapeznikov-mikhail-otus`

-  перейти на удаленную ветку graphQL c помощью команды:
    `git checkout origin/graphQl`


**Установка зависимостей**

- в терминале перейти в папку graphQL с помощью команды:
    `cd graphQL`
- запускаем команду в терминале `npm i`

**Запуск сервера graphQL**
 - запускаем команду в терминале `npm run start`
    - или `npm run dev` для запуска [nodemon](https://www.npmjs.com/package/nodemon)
- открываем браузер по адресу [localhost:4000/graphiql](http://localhost:4000/graphiql)
