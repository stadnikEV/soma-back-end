const mongoose = require('../libs/mongoose');
const createCompanyField = require('../libs/create-company-field');
const getName = require("../libs/get-name");
const getNumber = require('../libs/get-number');

module.exports = (req, res, next) => {
  const Company = require('../models/company');

  const companyName = req.body.companyName;
  const fio = req.body.fio;
  const email = req.body.email;
  const inn = getNumber({ string: req.body.inn });

  const name = getName({ fio: fio.toLowerCase() });

  const company = new Company({
    _id: new mongoose.Types.ObjectId(),
    companyName: createCompanyField({ companyName }),
    fio: [name.lastName, name.firstName, name.fatherName],
    email,
    inn,
  });

  company.save()
    .then(() => {
      res.json({});
    })
    .catch((e) => {
      next(e);
    });
};
