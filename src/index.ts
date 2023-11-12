import express from 'express'
import userRouter from './Routes/user.routes'
import productRouter from './Routes/product.routes'
import orderRoutes from './Routes/order.routes'

import databaseservice from './Services/database.services'
import { defaultErrorHandler } from './Middlewares/error.middleware'
import cors from 'cors'
import categoryRoutes from './Routes/category.routes'
import imageMediasRouter from './Routes/imageMedias.routes'
import { initFolder } from './Utils/file'
import { config } from 'dotenv'
import { UPLOAD_DRI } from './Constants/dir'

config()

const app = express()

app.use(
  cors({
    origin: '*',
    credentials: true
  })
)
databaseservice.connect()
const port = 8000
// console.log(options.development)
// minimits
// console.log(process.argv)
// xử lí hiển thị hình ảnh
// app.use('/imageMedias', express.static(UPLOAD_DRI))
app.use(express.static(UPLOAD_DRI))

app.use(express.json())
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/category', categoryRoutes)
app.use('/order', orderRoutes)

app.use('/imageMedias', imageMediasRouter)
app.use(defaultErrorHandler)

// tạo folder upload
initFolder()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
