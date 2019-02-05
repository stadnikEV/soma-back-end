const mongoose = require('./mongoose');
const createCompanyField = require('./create-company-field');
const xlsxToJsonFile = require("./xlsx-to-json-file");
const removeDirectory = require("./remove-directory");
const jsonFileToObject = require("./json-file-to-object");
const getName = require("./get-name");
const saveAll = require("./mongoose-save-all");
const getEmail = require("./get-email");
const Company = require('../models/company');

    let data = null;

    xlsxToJsonFile({
      input: "db-excel.xlsx",
      output: "1.json",
    })
      .then(() => {
        return jsonFileToObject({ path: '1.json' });
      })
      .then((result) => {
        data = result;
        return removeDirectory({ path: '1.json' });
      })
      .then(() => {
        const documents = [];

        data.forEach((row) => {

          const name = getName({ fio: row.ФИО.toLowerCase() });
          if (!name) {
            return;
          }
          const company = new Company({
            _id: new mongoose.Types.ObjectId(),
            companyName: createCompanyField({ companyName: row.Компания }),
            fio: [name.lastName, name.firstName, name.fatherName],
            email: getEmail({ email: row.Почта }),
          });

          documents.push(company);
        })

        return saveAll({ documents });
      })
      .then(() => {
        console.log('Данные сохранены');
      })
      .catch((e) => {
        console.log(e);
      });
