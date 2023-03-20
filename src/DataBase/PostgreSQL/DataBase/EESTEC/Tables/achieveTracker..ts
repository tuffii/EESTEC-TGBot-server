import * as ServerCore from "@var3n1k/server-core";

const TableName = `achieve_tracker`;
const TableFields = {
  ID: `id`,
  personName: `personName`,
  achieveID: `achieveID`,
} as const;

export interface Output {
  readonly [TableFields.ID]: number; // Декларация типа данных, которое содержит поле при ВЫВОДЕ
  readonly [TableFields.personName]: string;
  readonly [TableFields.achieveID]: number;
}

export interface Input {
  readonly [TableFields.personName]: Output[typeof TableFields.personName]; // Декларация типа данных, которое содержит поле при ВВОДЕ со ссылкой на декларацию этого же поля для вывода. Количество полей для ввода может быть меньше, чем количество полей для вывода (к примеру, поле id - автоинкриминирующееся число -> его не нужно указывать вручную)
  readonly [TableFields.achieveID]: Output[typeof TableFields.achieveID];
}

export default class Table extends ServerCore.Engine.API.DataBase.PostgreSQL.API
  .DataBases.Tables.BaseTable<Input, Output> {
  constructor(
    api: ServerCore.Engine.API.DataBase.PostgreSQL.API.default,
    database: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.BaseDataBase
  ) {
    super(api, database, TableName, {
      [TableFields.ID]: {
        Type: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables
          .DataType.Numeric.Int, // Тип поля -> INT
        MetaData: {
          DefaultValue: undefined, // У поля нет стандартного значения
          IsPrimary: true, // Поле является первичным ключом (идентификатором записи)
          IsRequired: true, // Поле обязательное и не может содержать NULL
          IsUnique: true, // Поле должно быть уникальным. Запрещается любое совпадение такого поля с другими записями этой таблицы
          MustBeAutoIncremented: true, // Поле должно инкрементироваться автоматически (ТОЛЬКО ДЛЯ ТИПОВ INT | INTEGER)
        },
      },
      [TableFields.personName]: {
        Type: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables
          .DataType.String.Text, // Тип поля -> TEXT
        MetaData: {
          DefaultValue: undefined, // У поля нет стандартного значения
          IsPrimary: false, // Поле является стандартным
          IsRequired: true, // Поле обязательное и не может содержать NULL
          IsUnique: false, // Поле не является уникальным и может совпадать с другими записями
          MustBeAutoIncremented: false, // Поле не должно инкрементироваться, так как имеет тип TEXT
        },
      },
      [TableFields.achieveID]: {
        Type: ServerCore.Engine.API.DataBase.PostgreSQL.API.DataBases.Tables
          .DataType.String.Text, // Тип поля -> TEXT
        MetaData: {
          DefaultValue: undefined, // У поля нет стандартного значения
          IsPrimary: false, // Поле является стандартным
          IsRequired: true, // Поле обязательное и не может содержать NULL
          IsUnique: false, // Поле не является уникальным и может совпадать с другими записями
          MustBeAutoIncremented: false, // Поле не должно инкрементироваться, так как имеет тип TEXT
        },
      },
    });
  }
}
