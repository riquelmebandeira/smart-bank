import app from './app'
import errorMiddleware from './middlewares/errorMiddleware'
import transactionRouter from './routes/TransactionRouter'
import userRouter from './routes/UserRouter'

const PORT = process.env.PORT || 3001

app.express.use(userRouter)
app.express.use(transactionRouter)
app.express.use(errorMiddleware)

app.express.listen(PORT, () => {
  console.log(`Server online on port ${PORT}`)
})
