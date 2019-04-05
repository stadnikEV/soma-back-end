const Company = require('../models/company');

const newFio = [];
let count = 0;

Company.find({ fio: /ё/ })
  .then((documents) => {

    documents.forEach((item) => {
      item.fio = item.fio.map((name) => {
        return name.replace(/ё/, 'е');
      });
      newFio.push({
        id: item._id,
        fio: item.fio,
      });
    });

    return new Promise((resolve, reject) => {
      const save = () => {
        const item = newFio.pop();

        Company.findById(item.id)
          .then((company) => {
            company.fio = item.fio;
            return company.save();
          })
          .then(() => {
            count += 1;
            if (!newFio.length) {
              resolve();
              return;
            }
            save();
          })
          .catch((e) => {
            reject(e);
          });
      }

      save();
    });
  })
  .then(() => {
    console.log(`Заменено в ${count} документах`);
  })
  .catch((e) => {
    console.log(e);
  });
