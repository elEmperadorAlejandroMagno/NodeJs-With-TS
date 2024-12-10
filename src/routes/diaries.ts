import express from 'express'
import { addEntry, getEntries, getEntriesById } from '../services/diary'

const router = express.Router()

router.get('/', (_req, res) => {
  const entries = getEntries()
  res.json(entries)
})
router.get('/:id', (req, res) => {
  const { id } = req.params
  const entries = getEntriesById(id)
  res.json(entries)
})

router.post('/', (req, res) => {
  const diaryEntry = req.body
  const newEntry = addEntry(diaryEntry)
  res.json(newEntry)
})

export default router
