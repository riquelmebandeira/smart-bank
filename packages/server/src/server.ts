import app from './app'
import errorMiddleware from './middlewares/errorMiddleware'

const PORT = process.env.PORT || 3001

app.express.use(errorMiddleware)

app.express.listen(PORT, () => {
  console.log(`Server online on port ${PORT}`)
})
