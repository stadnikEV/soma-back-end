const xlsxToJsonFile = require("./xlsx-to-json-file");
const removeDirectory = require("./remove-directory");

removeDirectory({ path: '1.json' })
  .then(() => {
    return xlsxToJsonFile({
      input: "db-excel.xlsx",
      output: "1.json",
    })
  })
  .then(() => {
    console.log('Конвертация завершина')
  })
  .catch((e) => {
    console.log(e)
  })
