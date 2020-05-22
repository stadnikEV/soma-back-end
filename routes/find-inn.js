const getNumber = require('../libs/get-number');

module.exports = (req, res, next) => {
  const Company = require('../models/company');
  const inn = getNumber({ string: req.body.inn });

  Company.find({ inn: { $in: inn } }, ['-_id', 'inn' ])
    .then((documents) => {
      res.json(documents);
    })
    .catch((e) => {
      next(e);
    });
}
