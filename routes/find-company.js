const createCompanyField = require('../libs/create-company-field');
const getName = require("../libs/get-name");
const getMatchReference = require('../libs/get-match-reference');
// const getParams = require('../libs/get-params');

module.exports = (req, res, next) => {
  const Company = require('../models/company');
  // const params = getParams({ req });
  const companyName = req.body.companyName;
  let fio = req.body.fio;

  const companies = createCompanyField({ companyName });
  const name = getName({ fio: fio.toLowerCase() });
  fio = [name.lastName, name.firstName, name.fatherName];

  const companyQuery = getMatchReference({ arr: companies, fieldName: 'companyName', matchProcent: 60 });
  const fioQuery = getMatchReference({ arr: fio, fieldName: 'fio', matchProcent: 59 });

  Company.find({
    $and: [
      {
       $or : companyQuery,
      },
      {
       $or : fioQuery,
      }
    ]
  }, ['-_id', "companyName", 'fio', 'email' ])
    .then((documents) => {
      res.json(documents);
    })
    .catch((e) => {
      next(e);
    });
};
