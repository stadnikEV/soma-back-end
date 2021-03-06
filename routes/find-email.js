
module.exports = (req, res, next) => {
  const Company = require('../models/company');
  const email = req.body.email;

  Company.find({ email: { $in: email } }, ['-_id', 'email' ])
    .then((documents) => {
      res.json(documents);
    })
    .catch((e) => {
      next(e);
    });
}
