// const getEmail = require("../libs/get-email");

module.exports = (req, res, next) => {
  const Company = require('../models/company');
  const email = req.body.email;

  Company.find({ email }, ['-_id', 'email' ])
    .then((documents) => {
      console.log(documents);
      res.json(documents);
    })
    .catch((e) => {
      next(e);
    });
};
