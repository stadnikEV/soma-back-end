const Company = require('../models/company');
const saveToXlsx = require('./save-to-xlsx');

Company
 .aggregate([
    {
      $project: {
        _id: 0,
        "Компания": {
          $reduce: {
            input: "$companyName",
            initialValue: "",
            in: { $concat : [ "$$value", "$$this", " " ]}
          }
        },
        "Фамилия": { $arrayElemAt: [ "$fio", 0 ] },
        "Имя": { $arrayElemAt: [ "$fio", 1 ] },
        "Отчество": { $arrayElemAt: [ "$fio", 2 ] },
        "Почта": {
          $reduce: {
            input: "$email",
            initialValue: "",
            in: { $concat : [ "$$value", "$$this", " " ]}
          }
        },
      },
    }
  ])
  .then((documents) => {
    return saveToXlsx({
      fields: [
        'Компания',
        "Фамилия",
        "Имя",
        "Отчество",
        "Почта",
      ],
      data: documents,
      path: 'excel/database.xlsx',
    })
  })
  .then(() => {
    console.log('XLSX успешно создан');
  })
  .catch((e) => {
    console.log(e);
  });
