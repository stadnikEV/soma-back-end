const xlsxToJsonFile = require("./xlsx-to-json-file");
const removeDirectory = require("./remove-directory");

removeDirectory({ path: 'db-excel.json' })
  .then(() => {
    return xlsxToJsonFile({
      input: "db-excel.xlsx",
      output: "db-excel.json",
    })
  })
  .then(() => {
    console.log('Конвертация завершина')
  })
  .catch((e) => {
    console.log(e)
  })
