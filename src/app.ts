import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { productRouter } from './app/modules/product/product.route'
import { OrderRoute } from './app/modules/order/order.route'
const app:Application = express()

app.use(cors())
app.use(express.json())

// handle syntax error in json middleware
app.use((err:SyntaxError | unknown, req:Request, res:Response, next:NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});

// product Router here
app.use('/api/', productRouter);
// order route here
app.use('/api/', OrderRoute);

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({ 
    success: true,
    message: 'Assingnment 2 Node Js API'
    })
})

// handle route not found middleware
app.use((req:Request, res:Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

export default app