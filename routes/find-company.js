const createCompanyField = require('../libs/create-company-field');
const getName = require("../libs/get-name");
const getMatchReference = require('../libs/get-match-reference');
// const getParams = require('../libs/get-params');

module.exports = (req, res, next) => {
  const Company = require('../models/company');
  // const params = getParams({ req });
  const companyName = req.body.companyName;
  let fio = req.body.fio;
  const matchCompanyProcent = req.body.matchCompanyProcent;
  const matchFioProcent = req.body.matchFioProcent;

  const companies = createCompanyField({ companyName });
  const name = getName({ fio: fio.toLowerCase() });
  fio = [name.lastName, name.firstName, name.fatherName];

  const companyQuery = getMatchReference({ arr: companies, fieldName: 'companyName', matchProcent: matchCompanyProcent });
  const fioQuery = getMatchReference({ arr: fio, fieldName: 'fio', matchProcent: matchFioProcent });

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
