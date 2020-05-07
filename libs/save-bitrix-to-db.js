const rp = require('request-promise')
const Bitrix = require('../models/bitrix')
const mongoose = require('./mongooseBitrix')
const saveAll = require("./mongoose-save-all")

const getFromBitrix = ({ id }) => {
  return new Promise((resolve, reject) => {
    const options = {
        method: 'POST',
        uri: `https://b24-ljgv3n.bitrix24.ru/rest/12/tr83lldu35cvx8nd/crm.company.list?filter[>ID]=${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          select: [
            "ID",
            "COMMENTS",
            "TITLE",
            "UF_CRM_1549133368",
            "UF_CRM_1549132820",
            "UF_CRM_1549133401",
            "EMAIL",
          ],
        },
        json: true
    }
    rp(options)
      .then((response) => {
        resolve(response.result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


const createDocuments = (list) => {
  const documents = []

  list.forEach((item) => {
    const email = item.EMAIL && item.EMAIL.map((item) => item.VALUE)
    console.log(email)
    const company = new Bitrix({
      _id: new mongoose.Types.ObjectId(),
      id: item.ID,
      companyName: item.TITLE,
      comments: item.COMMENTS,
      email: email || [],
      adress: item.UF_CRM_1549133368,
      inn: item.UF_CRM_1549132820,
      phone: item.UF_CRM_1549133401,
    })

    documents.push(company)
  })

  return documents
}



let lastID = 115703

const saveBirtixToDB = async () => {
  console.log(lastID)
  const list = await getFromBitrix({ id: lastID })

  const documents = createDocuments(list)

  await saveAll({ documents })

  if (list.length === 0) {
    console.log('Данные успешно добавлены')
    return
  }

  lastID = Number(list[list.length - 1].ID) + 1

  setTimeout(() => {
    saveBirtixToDB()
      .catch((e) => {
        console.log(e)
        console.log(`Ошибка! Последний ID: ${lastID}`)
      })
  }, 500)
}

saveBirtixToDB()
