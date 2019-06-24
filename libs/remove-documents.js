
module.exports = ({ Model, documents }) => {
  return new Promise((resolve, reject) => {
    if (documents.length === 0) {
      resolve()
      return
    }

    const remove = () => {
      const document = documents.pop()

      Model.remove({ _id: document._id })
        .then(() => {

          if (documents.length === 0) {
            resolve()
            return
          }

          remove()
        })
        .catch((e) => {
          reject(e)
        })
    }

    remove()
  })
}
