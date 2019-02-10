
module.exports = ({ comment }) => {

  return comment.match(/(([a-zA-Z0-9а-яА-ЯёЁ]+\s*-\s*[a-zA-Z0-9а-яА-ЯёЁ]+|[a-zA-Z0-9а-яА-ЯёЁ]+)\s*)+</)[0];
};
