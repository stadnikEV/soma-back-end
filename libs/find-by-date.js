
module.exports = ({ Model, from, to }) => {
  return new Promise((resolve, reject) => {
    Model.find({
      created: {
        "$gte": from, // new Date(2019, 5, 25)
        "$lt": to,
      }
    })
      .then((documents) => {
        resolve(documents)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
