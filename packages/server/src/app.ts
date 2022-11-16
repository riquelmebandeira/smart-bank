import express from 'express'
import cors from 'cors'

class App {
  public express: express.Application

  constructor() {
    this.express = express()
    this.middlewares()
  }

  private middlewares() {
    this.express.use(express.json())
    this.express.use(cors())
  }
}

export default new App()
