const mongoose = require('../libs/mongoose');
const createCompanyField = require('../libs/create-company-field');
const getName = require("../libs/get-name");

module.exports = (req, res, next) => {
  const Company = require('../models/company');

  const companyName = req.body.companyName;
  const fio = req.body.fio;
  const email = req.body.email;

  const name = getName({ fio: fio.toLowerCase() });

  const company = new Company({
    _id: new mongoose.Types.ObjectId(),
    companyName: createCompanyField({ companyName }),
    fio: [name.lastName, name.firstName, name.fatherName],
    email,
  });

  company.save()
    .then(() => {
      res.json({});
    })
    .catch((e) => {
      console.log(e);
    });
};
