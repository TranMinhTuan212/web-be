import express from 'express'
import userRouter from './Routes/user.routes'
import productRouter from './Routes/product.routes'
import orderRoutes from './Routes/order.routes'

import databaseservice from './Services/database.services'
import { defaultErrorHandler } from './Middlewares/error.middleware'
import cors from 'cors'
import categoryRoutes from './Routes/category.routes'
const app = express()

app.use(
  cors({
    origin: '*',
    credentials: true
  })
)
databaseservice.connect()
const port = 3000
app.use(express.json())

app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/category', categoryRoutes)
app.use('/order', orderRoutes)


app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
