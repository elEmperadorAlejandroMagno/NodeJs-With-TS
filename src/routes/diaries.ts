import express from 'express'
import { addEntry, getEntries, getEntriesById } from '../services/diary'
import toNewEntry from '../utils'

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
  try {
    const { date, weather, visibility, comment } = toNewEntry(req.body)
    const newEntry = addEntry({ date, weather, visibility, comment })
    res.json(newEntry)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default router
