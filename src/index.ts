import express from 'express'
import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json()) // middleware que transofrma req.body a json

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!! ' + new Date().toLocaleDateString())
  res.send('pong')
})

app.use('/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
