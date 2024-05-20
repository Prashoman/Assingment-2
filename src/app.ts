import express, { Application, Errback, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { productRouter } from './app/modules/product/product.route'
const app:Application = express()

app.use(cors())
app.use(express.json())
app.use((err:SyntaxError | any, req:Request, res:Response, next:NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});

app.use('/api/', productRouter);

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

export default app