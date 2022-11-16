import app from './app'

const PORT = process.env.PORT || 3001

app.express.listen(PORT, () => {
  console.log(`Server online on port ${PORT}`)
})
