const CompanyBitrix = require('../models/bitrix')
const Company = require('../models/company')
const createCompanyField = require('./create-company-field')
const getFioFromComment = require("./get-fio-from-comment")
const getName = require("./get-name")
const stringToArray  = require("./string-to-array")
const saveAll = require("./mongoose-save-all")

const idIgnore = ['39728']

const errName = []
const documents = []

CompanyBitrix.find()
  .then((data) => {
    return new Promise((resolve) => {
      const createCompany = () => {
        console.log(data.length)
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

        const fio = getFioFromComment({ comment: row.comments });

        if (!fio) {
          console.log(`Не корректное имя: ${row.comments}`);
          errName.push({
            id: row.id,
            item: row.comments,
          })
          createCompany()
          return;
        }

        const name = getName({ fio: fio.toLowerCase() });
        if (!name) {
          console.log(`Не корректное имя: ${fio}`);
          errName.push({
            id: row.id,
            item: fio,
          })
          createCompany()
          return;
        }

        const mongoose = require('./mongoose')

        const company = new Company({
          _id: new mongoose.Types.ObjectId(),
          companyName: createCompanyField({ companyName: row.companyName }),
          fio: [name.lastName, name.firstName, name.fatherName],
          email: row.email,
          inn: stringToArray(row.inn),
          adress: stringToArray(row.adress),
          phone: stringToArray(row.phone)
        });

        documents.push(company)

        setTimeout(() => {
          createCompany()
        })
      }

      createCompany()
    })
  })
  // .then((documents) => {
  //   return saveAll({ documents })
  // })
  .then(() => {
    errName.forEach((elem) => {
      console.log('-------------------------')
      console.log(elem)
    })
    console.log('Данные сохранены');
  })
  .catch((e) => {
    console.log(e)
  })