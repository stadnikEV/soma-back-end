const mongoose = require('./mongoose');
const createCompanyField = require('./create-company-field');
const jsonFileToObject = require("./json-file-to-object");
const getName = require("./get-name");
const saveAll = require("./mongoose-save-all");
const getEmail = require("./get-email");
const getFioFromComment = require("./get-fio-from-comment");
const Company = require('../models/company');
const stringToArray  = require("./string-to-array")

    const idIgnore = ['39728']

    let data = null;
    const errName = []

    jsonFileToObject({ path: 'db-excel.json' })
      .then((result) => {
        data = result
        const documents = [];

        return new Promise((resolve) => {
          const createCompany = () => {

            if (data.length === 0) {
              resolve(documents)
              return
            }

            const row = data.pop()

            if (idIgnore.indexOf(row.id) !== -1) {
              errName.push(row.comments)
              createCompany()
              return
            }

            const fio = getFioFromComment({ comment: row.Комментарий });

            if (!fio) {
              console.log(`Не корректное имя: ${row.Комментарий}`);
              errName.push(row.Комментарий)
              createCompany()
              return;
            }
            const name = getName({ fio: fio.toLowerCase() });
            if (!name) {
              console.log(`Не корректное имя: ${fio}`);
              errName.push(fio)
              createCompany()
              return;
            }
            const company = new Company({
              _id: new mongoose.Types.ObjectId(),
              companyName: createCompanyField({ companyName: row['Название компании'] }),
              fio: [name.lastName, name.firstName, name.fatherName],
              email: getEmail({ email: row['Рабочий e-mail'] }),
              phone: row.Телефон.match(/[0-9]+/g),
              inn: stringToArray(row.ИНН)
            });

            documents.push(company)

            setTimeout(() => {
              createCompany()
            }, 1)
          }

          createCompany()
        })
      })
      .then((documents) => {
        console.log(documents)
        return saveAll({ documents });
      })
      .then(() => {
        errName.forEach((elem) => {
          console.log('-------------------------')
          console.log(elem)
        })
        console.log('Данные сохранены');
      })
      .catch((e) => {
        console.log(e);
      });
