import express from 'express'
import { addEntry, getEntries, getEntriesById } from '../services/diary'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(getEntries())
})
router.get('/:id', (req, res) => {
  const entry = getEntriesById(req.params.id)
  if (entry === undefined) {
    res.sendStatus(404)
  } res.send(entry)
})

router.post('/', (req, res) => {
  res.send(addEntry(req.body))
})

export default router
