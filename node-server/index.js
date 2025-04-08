import App from './app'

const app = new App

const server = app.listen(6005, () => {
  console.log('app is starting at: http://localhost:6005;')
})

server.timeout = 1000 * 60 * 5