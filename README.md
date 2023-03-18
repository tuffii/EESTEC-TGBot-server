# Документация


## Настройка окружения для разработки
* [Для пользователей Windows](#настройка-окружения-для-пользователей-windows)
* [Для пользователей Linux](#настройка-окружения-для-пользователей-linux)


### Настройка окружения для пользователей Windows
1. Установить среду выполнения [Node.JS](https://nodejs.org/en)
    * Перейти по ссылке на официальный сайт Node.JS и скачать последнюю актуальную **LTS** версию
    * После установки открыть терминал в любом месте и командой `node -v` убедиться, что установка прошла успешно
    * В том же терминале командой `npm -v` убедиться, что у вас установлен менеджер пакетов NPM
2. Установить транспиллятор [TypeScript](https://www.typescriptlang.org/download) любым из предложенных способов
    * Открыть терминал в любом месте и командой `npm i -g typescript` установить TypeScript **глобально**
    * Открыть терминал в корневой папке проекта и командой `npm -D typescript` установить TypeScript **локально**
3. Установить базу данных [PostgreSQL](https://www.postgresql.org/download/windows/)
    * Перейти по ссылке на официальный сайт PostgreSQL, скачать и установить последнюю актуальную версию
    * В процессе установки **не нужно** трогать настройки стандартного порта сервера. Он **должен остаться неизмененным (`5432`)**
    * На этапе создания пароля для стандартного пользователя `postgres` рекомендуется его сохранить, чтобы избежать переустановки PostgreSQL
    * После установки открыть терминал из ее корневой папки (`C:\Program Files\PostgreSQL\{version}\bin`) и командой `psql -U postgres` войти в систему
    * Создать новую базу данных `eestec` командой `CREATE DATABASE eestec;`
    * Выйти из системы PostgreSQL, написав команду `\q`
4. Создать собственного бота в Telegram для удобного тестирования
    * Перейти в личные сообщения с [BotFather](https://telegram.me/BotFather) и ввести команду /newbot
    * После указания названия и имени бота получить `TOKEN`
5. Настроить переменные окружения
    * В корневой папке проекта создать пустой файл `.env`
    * В только что созданном файле объявить переменные:
        ```env
        SERVER_REMOTE='false' # Расположение серверной части
        SERVER_SECURE='false' # Наличие у серверной части SSL-сертификата
        SERVER_DOMAIN='localhost' # Доменное имя серверной части
        SERVER_PORT='5050' # Порт серверной части

        CLIENT_REMOTE='true' # Расположение клиентской части
        CLIENT_SECURE='true' # Наличие у клиентской части SSL-сертификата
        CLIENT_DOMAIN='6041-5-18-252-103.eu.ngrok.io' # Доменное имя клиентской части
        CLIENT_PORT='4173' # Порт клиентской части

        TELEGRAM_BOT_TOKEN='<TOKEN БОТА ТЕЛЕГРАММ>'

        POSTGRE_SQL_HOSTNAME='localhost' # НЕ ТРОГАТЬ
        POSTGRE_SQL_PORT='5432' # НЕ ТРОГАТЬ

        POSTGRE_SQL_USERNAME='postgres' # НЕ ТРОГАТЬ
        POSTGRE_SQL_PASSWORD='<ПАРОЛЬ ОТ ПОЛЬЗОВАТЕЛЯ postgres>'
        ```
6. Собрать текущую версию проекта
    * Запустить файл `#Dependencies Install` из корневой папки проекта (**`#Dependencies Update` НЕ ЗАПУСКАТЬ**)
    * Запустить файл `#Build` из корневой папки проекта
    * Запустить файл `#RunProd` из корневой папки проекта

### Настройка окружения для пользователей Linux
1. Установить среду выполнения [Node.JS](https://nodejs.org/en)
    * `curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh`
    * `sudo bash nodesource_setup.sh`
    * `sudo apt install nodejs`
    * После установки открыть терминал в любом месте и командой `node -v` убедиться, что установка прошла успешно
    * В том же терминале командой `npm -v` убедиться, что у вас установлен менеджер пакетов NPM
2. Установить транспиллятор [TypeScript](https://www.typescriptlang.org/download) любым из предложенных способов
    * Открыть терминал в любом месте и командой `npm i -g typescript` установить TypeScript **глобально**
    * Открыть терминал в корневой папке проекта и командой `npm -D typescript` установить TypeScript **локально**
3. Установить базу данных [PostgreSQL](https://www.postgresql.org/download/windows/)
    * `sudo apt install postgresql`
    * После установки открыть терминал в любом месте и командой `sudo -i -u postgres` зайти под пользователем `postgres`
    * В том же терминале командой `psql` войти в систему
    * Создать пароль для стандартного пользователя `postgres` командой `ALTER USER postgres WITH PASSWORD '<НОВЫЙ ПАРОЛЬ>';`
    * Создать новую базу данных `eestec` командой `CREATE DATABASE eestec;`
    * Выйти из системы PostgreSQL, написав команду `\q`
4. Создать собственного бота в Telegram для удобного тестирования
    * Перейти в личные сообщения с [BotFather](https://telegram.me/BotFather) и ввести команду /newbot
    * После указания названия и имени бота получить `TOKEN`
5. Настроить переменные окружения
    * В корневой папке проекта создать пустой файл `.env`
    * В только что созданном файле объявить переменные:
        ```env
        SERVER_REMOTE='false' # Расположение серверной части
        SERVER_SECURE='false' # Наличие у серверной части SSL-сертификата
        SERVER_DOMAIN='localhost' # Доменное имя серверной части
        SERVER_PORT='5050' # Порт серверной части

        CLIENT_REMOTE='true' # Расположение клиентской части
        CLIENT_SECURE='true' # Наличие у клиентской части SSL-сертификата
        CLIENT_DOMAIN='6041-5-18-252-103.eu.ngrok.io' # Доменное имя клиентской части
        CLIENT_PORT='4173' # Порт клиентской части

        TELEGRAM_BOT_TOKEN='<TOKEN БОТА ТЕЛЕГРАММ>'

        POSTGRE_SQL_HOSTNAME='localhost' # НЕ ТРОГАТЬ
        POSTGRE_SQL_PORT='5432' # НЕ ТРОГАТЬ

        POSTGRE_SQL_USERNAME='postgres' # НЕ ТРОГАТЬ
        POSTGRE_SQL_PASSWORD='<ПАРОЛЬ ОТ ПОЛЬЗОВАТЕЛЯ postgres>'
        ```
6. Собрать текущую версию проекта
    * Открыть терминал в корневой папке проекта и ввести команду `npm ci`
    * В том же терминале ввести команду `npm run build`
    * В том же терминале ввести команду `npm run prod`


## Использование функций основного импортированного модуля
* [Обработчик исключений](#обработчик-исключений)
* [Валидация параметров](#валидация-параметров)
* [Обработка параметров базовых типов](#обработка-параметров-базовых-типов)
* [Взаимодействие с консолью](#взаимодействие-с-консолью)
* [Создание паузы в работе алгоритма](#создание-паузы-в-работе-алгоритма)
* [Использование обработчика событий](#использование-обработчика-событий)
* [Использование системы очередей](#использование-системы-очередей)


### Обработчик исключений
* Для запуска обработчика исключений используется инициализация основного класса `Core`
    ```ts
    import * as ServerCore from '@var3n1k/server-core'

    const Core = new ServerCore.default({}, {}, {}, {})

    throw new Error(`тестовая ошибка`)
    ```

### Валидация параметров
* Для валидации параметров по типу используется класс `Validator`
    ```ts
    import * as ServerCore from '@var3n1k/server-core'

    function AnyFunction(parameter: unknown): any {
        const Validator = ServerCore.Engine.Module.Classes.Validator

        const ParameterIsString = Validator.TypeGuard.Default.IsString(parameter)
        if (ParameterIsString) {
            parameter  // IDE выделит тип `string` для параметра и выдаст в автодополнении все методы и свойства для типа `string`
        }

        const ParameterIsNumber: boolean = Validator.TypeGuard.Default.IsNumber(parameter)
        if (ParameterIsNumber) {
            parameter  // IDE НЕ выделит тип `number` для параметра, поскольку для значения `ParameterIsNumber` вручную укзаан тип `boolean`
        }

        if (Validator.TypeGuard.Default.IsFunction(parameter)) {
            parameter  // IDE выделит тип `function` для параметра и выдаст в автодополнении все методы и свойства для типа `function`
        }
    }
    ```
* Для валидации параметров по значению также используется класс `Validator`
    ```ts
    import * as ServerCore from '@var3n1k/server-core'

    function AnyFunction(parameter: unknown): any {
        const Validator = ServerCore.Engine.Module.Classes.Validator
        Validator.Strict(parameter, new Validator().Default.String().Required().MinLength(8).Of([`a`, `b`, `c`]).In([`abbbccac`, `bbacbbaa`]))
        // Валидатор проверит параметр на
        //   - Соответствие типу строки (.String())
        //   - Обязательное указание (.Required() -> не может быть `undefined` | `null`, и так далее)
        //   - Минимальную длину в 8 символов (.MinLength(8))
        //   - Содержание в себе исключительно символов (`a`, `b`, `c`) (.Of([`a`, `b`, `c`]))
        //   - Соответствие любому из предопределенных значений (`abbbccac`, `bbacbbaa`) (.In([`abbbccac`, `bbacbbaa`]))
        // В случае несоответствия параметра ожидаемому значению программа закончит работу с исключением, описывающим этот параметр

        const IsDefinedString = Validator.Soft(parameter, new Validator().Default.String().Required()).Status
        // Валидатор проверит параметр на
        //   - Соответствие типу строки (.String())
        //   - Обязательное указание (.Required() -> не может быть `undefined` | `null`, и так далее)
        // Валидатор вернет результат проверки в поле `Status` и в случае отрицательного результата исключение в поле `Error`
        // Вне зависимости от результата проверки программа закрыта НЕ БУДЕТ

        if (IsDefinedString) {
            parameter  // IDE НЕ выделит тип `string` для параметра, поскольку комбинирование в валидаторе тайпгардов вызовет перегрузку типов
        }
    }
    ```

### Обработка параметров базовых типов
* Для обработки стандартных параметров таких типов, как `string`, `number`, `bigint`, `Array<any>`, `object`, `RegExp`, `boolean`, `Date`, `Function` и `Error` используется модуль `TypeManager`
    ```ts
    import * as ServerCore from '@var3n1k/server-core'

    const TypeManager = ServerCore.Engine.Module.Functions.Parameter.Type.Manager

    const InitialDate = new Date()
    TypeManager.Default.Date.GetStringDate(InitialDate, true, true, true) // 18 Марта 2023
    TypeManager.Default.Date.GetStringDate(InitialDate, true, false, true) // 18 Марта 23
    TypeManager.Default.Date.GetStringDate(InitialDate, true, false, false) // 18.03.2023

    TypeManager.Default.Date.GetStringTime(InitialDate, true, true) // 12:32:45.153
    TypeManager.Default.Date.GetStringTime(InitialDate, true, false) // 12:32:45

    const InitialNumber = 6754673456
    TypeManager.Default.Numeric.ToRange(InitialNumber, -20, 123) // 123
    TypeManager.Default.Numeric.ToRange(InitialNumber, 500, undefined) // 6754673456
    ```

### Взаимодействие с консолью
* Для отображения сообщений в консоли используется класс `Console`
    ```ts
    import * as ServerCore from '@var3n1k/server-core'

    const Console = ServerCore.Engine.Module.Classes.Console

    Console.Log.Custom(true, true, `Обработка параметра `, 234, ` прошла успешно`) // ◉ [18 Марта 2023 | 12:32:45.153] Обработка параметра 234 прошла успешно
    Console.Log.Custom(false, true, `Обработка параметра `, 234, ` прошла успешно`) // [18 Марта 2023 | 12:32:45.153] Обработка параметра 234 прошла успешно
    Console.Log.Custom(false, false, `Обработка параметра `, 234, ` прошла успешно`) // Обработка параметра 234 прошла успешно

    Console.Log.Preset.Success(`Обработка параметра `, 234, ` прошла успешно`) // ◉ [18 Марта 2023 | 12:32:45.153] [SUCCESS] Обработка параметра 234 прошла успешно
    ```

### Создание паузы в работе алгоритма
* Для создания паузы в работе алгоритма используется функция `Sleep`
    ```ts
    import * as ServerCore from '@var3n1k/server-core'

    const Sleep = ServerCore.Engine.Module.Functions.Sleep

    const SleepRange = 2000 // Длительность паузы в миллисекундах
    await Sleep(SleepRange)
    ```

### Использование обработчика событий
* Для использования обработчика событий используется класс `EventEmitter` (обработчик событий, как правило, навешивается на значимые отлавливаемые классы)
    ```ts
    import * as ServerCore from '@var3n1k/server-core'

    const Core = new ServerCore.default({}, {}, {}, {})

    const Console = ServerCore.Engine.Module.Classes.Console

    Core.Event.Emitter.On(Core.Event.Name.Init, async () => {
        Console.Log.Preset.Success(`Приложение запущено`)
    })

    const InitializationFunction = (): Promise<void> => {
        // Функция, выполняемая непосредственно перед завершением инициализации проекта
    }
    await Core.Init(InitializationFunction)

    // ◉ [18 Марта 2023 | 12:32:45.153] [SUCCESS] Приложение запущено
    ```

### Использование системы очередей
* Для создания и управления очередями используется класс `Queue`
    ```ts
    import * as ServerCore from '@var3n1k/server-core'

    const Sleep = ServerCore.Engine.Module.Functions.Sleep

    const Queue = ServerCore.Engine.Module.Classes.Queue

    const Console = ServerCore.Engine.Module.Classes.Console

    const QueueUpdateCooldown = 0 // Задержка перед обработкой следующей порции параметров
    const QueueUpdateStack = 2 // Размер порции параметров, которые будут обрабатываться за один раз
    const QueueUpdateFunction = async (parameter_1: number, parameter_2: number): Promise<void> => {
        await Sleep(500)

        Console.Log.Preset.Info(`Обработка первого параметра (`, parameter_1, `) в процессе`)
        Console.Log.Preset.Info(`Обработка первого параметра (`, parameter_2, `) в процессе`)

        await Sleep(500)
    }
    const NewQueue = new Queue(QueueUpdateCooldown, QueueUpdateStack, QueueUpdateFunction)

    NewQueue.Pause()
    NewQueue.IsPaused() // true

    NewQueue.Elements.AddTo.End(5, 23, 45, 456, 567, 45, 45)
    NewQueue.Elements.RemoveFrom.Start(2)

    NewQueue.Event.Emitter.On(NewQueue.Event.Name.Updating.End, async (elements) => {
        // Параметр `elements` без явного назначения типа выделяется IDE как тип `number` на основании функции `QueueUpdateFunction`, которая была передана в конструктор `Queue`

        NewQueue.Stop()
        // В отличии от события `End`, которое отлавливается текущей функцией и срабатывает при опустошении очереди, событие `Stop` эту очередь еще и прерывает, завершая цикл обновлений
    })
    NewQueue.Events.Emitter.On(NewQueue.Events.Name)

    NewQueue.Resume()
    NewQueue.IsPaused() // false
    ```


## Внутренние модули
* [Внутренний API](#внутренний-api)


### Внутренний API
* Разработка новых частей модуля `API` находится в папке `./src/API`
    * Папка `./Services` отвечает за сервисы, обрабатывающие **ТЕЛО** HTTP запроса и выдающие конкретный результат (`пуш новой записи в базу данных`)
    * Папка `./Controllers` отвечает за контроллеры, получающие на вход объекты `request` и `response` HTTP запроса и передающие их поочередно в несколько сервисов для обработки (`контроллер User.Register сначала использует сервис User.DoesExist для проверки наличия пользователя, а потом серви User.Create для пуша новой записи в БД`)
    * Папка `./Routes` отвечает за декларацию эндпоинтов, которые будут при поступлении нового запроса вызывать нужные контроллеры (`при POST запросе на эндпоинт /api/users/auth/register будет вызван контроллер User.Register`)

### DataBase | PostgreSQL
* Разработка базы данных находится в папке `./src/DataBase/PostgreSQL`
    * Папка `./src/DataBase/PostgreSQL/DataBase/EESTEC` отвечает за используемые базы данных (`в значении сборника таблиц`). В проекте планируется использование **единственной** базы данных `eestec`, поэтому добавлять новые файлы в корневую папку `./src/DataBase/PostgreSQL/DataBase/EESTEC` **НЕ НУЖНО**
    * Папка `./src/DataBase/PostgreSQL/DataBase/EESTEC/Tables` отвечает за используемые таблицы в базе данных `eestec`. Изменять старые таблицы можно **только** после согласования, поскольку любое изменение вызовет конфликты типов по всему проекту
        * Для создания новой таблицы рекомендуется придерживаться данного шаблона
            ```ts
            import * as ServerCore from '@var3n1k/server-core'

            const TableName = `<ВАШЕ НАЗВАНИЕ ТАБЛИЦЫ ПРОПИСНЫМИ БУКВАМИ>`
            const TableFields = {
                ID: `id`, // Название стандартного поля таблицы. Как правило, используется автоматически инкрементируемое число для индексации записей таблицы
                CustomField: `custom_field`, // Название поля таблицы. Число таких полей ограничено лишь возможностями PostgreSQL
            } as const

            export interface Output {
                readonly [TableFields.ID]: number // Декларация типа данных, которое содержит поле при ВЫВОДЕ
                readonly [TableFields.CustomField]: string
            }

            export interface Input {
                readonly [TableFields.CustomField]: Output[typeof TableFields.CustomField] // Декларация типа данных, которое содержит поле при ВВОДЕ со ссылкой на декларацию этого же поля для вывода. Количество полей для ввода может быть меньше, чем количество полей для вывода (к примеру, поле id - автоинкриминирующееся число -> его не нужно указывать вручную)
            }

            export default class Table extends ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.BaseTable<Input, Output> {
                constructor(api: ServerCore.Engine.API.DataBase.PostgreSQL.API.default, database: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.BaseDataBase) {
                    super(api, database, TableName, {
                        [TableFields.ID]: {
                            Type: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.Numeric.Int, // Тип поля -> INT
                            MetaData: {
                                DefaultValue: undefined, // У поля нет стандартного значения
                                IsPrimary: true, // Поле является первичным ключом (идентификатором записи)
                                IsRequired: true, // Поле обязательное и не может содержать NULL
                                IsUnique: true, // Поле должно быть уникальным. Запрещается любое совпадение такого поля с другими записями этой таблицы
                                MustBeAutoIncremented: true, // Поле должно инкрементироваться автоматически (ТОЛЬКО ДЛЯ ТИПОВ INT | INTEGER)
                            },
                        },
                        [TableFields.CustomField]: {
                            Type: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables.DataType.String.Text, // Тип поля -> TEXT
                            MetaData: {
                                DefaultValue: undefined, // У поля нет стандартного значения
                                IsPrimary: false, // Поле является стандартным
                                IsRequired: true, // Поле обязательное и не может содержать NULL
                                IsUnique: false, // Поле не является уникальным и может совпадать с другими записями
                                MustBeAutoIncremented: false, // Поле не должно инкрементироваться, так как имеет тип TEXT
                            },
                        },
                    })
                }
            }
            ```
        * После создания таблицы ее нужно экспортировать в файле `./src/DataBase/PostgreSQL/DataBase/EESTEC/Tables/__tables.ts`
            ```ts
            ...

            export * as НАЗВАНИЕ_ФАЙЛА_С_ТАБЛИЦЕЙ from './<НАЗВАНИЕ ФАЙЛА С ТАБЛИЦЕЙ>.js'

            ...
            ```
        * После экспорта таблицы ее нужно импортировать в базу данных в файле `./src/DataBase/PostgreSQL/DataBase/EESTEC/EESTEC.ts`
            ```ts
            ...

            export default class DataBase extends ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.BaseDataBase {
                ...

                public async Init(): Promise<void> {
                    const Tables = [
                        this.Tables.НАЗВАНИЕ_ТАБЛИЦЫ, // Здесь сущность, импортированная ниже по файлу, включается в список автоматической проверки. При запуске проекта, база данных `eestec` пройдет по всем этим сущностям и создаст в базе данных недостающие таблицы
                    ]

                    await Promise.all(Tables.map(async (_el, _ind, _arr) => await _el.CreateIfNotExist()))
                }

                ...

                constructor(api: ServerCore.Engine.API.DataBase.PostgreSQL.API.default, name: string) {
                    super(api, name)

                    this.Tables = {
                        ...

                        НАЗВАНИЕ_ТАБЛИЦЫ: new Tables.НАЗВАНИЕ_ФАЙЛА_С_ТАБЛИЦЕЙ.default(api, this), // Здесь таблица импортируется из файла `__tables.ts` и создается новая сущность таблицы, которая записыается в поле с интуитивно понятным названием
                        
                        ...
                    }
                }

                ...
            }

            ...
            ```

### ChatBot | Telegram
* Разработка бота Телеграмм находится в папке `./src/Telegram`
    * Папка `./src/Telegram/Commands` отвечает за используемые в боте команды. Изменять старые команды можно **только** после согласования, поскольку любое изменение может вызвать конфликт выполнения
        * Для создания новой команды рекомендуется придерживаться данного шаблона
            ```ts
            import * as ServerCore from '@var3n1k/server-core'

            import * as GlobalModule from '../../module.js'

            const CommandName = `test`

            export default class Command extends ServerCore.Engine.API.ChatBot.Telegram.API.Commands.BaseCommand {
                // TODO: JSDoc
                constructor(api: ServerCore.Engine.API.ChatBot.Telegram.API.default) {
                    const Validator = ServerCore.Engine.Module.Classes.Validator
                    Validator.Strict(api, new Validator().Default.Class.Instance().Required().Of(ServerCore.Engine.API.ChatBot.Telegram.API.default))

                    super(api, CommandName, {
                        Chat: {
                            Private: true,
                            Public: {
                                Group: false,
                                Channel: false,
                            },
                        },
                    }, async (context, command, commandName, commandQuery, commandChat, commandAuthor) => {
                        const Validator = ServerCore.Engine.Module.Classes.Validator // Импорт валидатора для проверки всех параметров. Проверка ДОЛЖНА осуществляться методом `Validator.Soft` для того, чтобы избежать завершения работы приложения, получить текст ошибки и вывести ее пользователю

                        await context.reply(`Уга-буга`) // Сообщение, которое будет отправлять бот пользователю в ответ на команду /test
                    })
                }
            }
            ```
        * После создания команды, эскпортировать или импортировать ее **НИКУДА НЕ НУЖНО**. Она подключится **АВТОМАТИЧЕСКИ**