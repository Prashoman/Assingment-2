import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { productRouter } from './app/modules/product/product.route'
const app:Application = express()

app.use(cors())
app.use(express.json())

app.use('/api/', productRouter);

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app