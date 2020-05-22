module.exports = ({ app }) => {
  app.post('/companies', require('./find-company'));
  app.post('/email', require('./find-email'));
  app.post('/inn', require('./find-inn'));
  app.post('/add-company', require('./add-company'));
}
