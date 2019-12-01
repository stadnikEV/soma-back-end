
module.exports = ({ comment }) => {
  const fio = comment.match(/(([a-zA-Z0-9а-яА-ЯёЁ]+\s*-\s*[a-zA-Z0-9а-яА-ЯёЁ]+|[a-zA-Z0-9а-яА-ЯёЁ]+)\s*)+</)

  if (!fio) {
    return null
  }

  return fio[0]
};
