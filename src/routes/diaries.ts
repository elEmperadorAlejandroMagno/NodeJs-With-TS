import express from 'express'
import { addEntry, getEntries, getEntryById, updateEntry, deleteEntry } from '../services/diary'
import { toNewEntry, toUpdateEntry } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(getEntries())
})
router.get('/:id', (req, res) => {
  const entry = getEntryById(req.params.id)
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

router.put('/:id', (req, res) => {
  try {
    const input: any = toUpdateEntry(req.body)
    const id = req.params.id
    if (input === 'undefined' || id === null) {
      throw new Error('Invalid or incorrect values')
    }
    const updatedEntry = updateEntry(input, id)
    res.json(updatedEntry)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

router.delete('/:id', (req, res) => {
  try {
    const id = req.params.id
    if (id === 'undefined') {
      throw new Error('Invalid or incorrect values')
    }
    const isDeleted = deleteEntry(id)
    if (!isDeleted) {
      throw new Error('Entry not found')
    } res.send('Diary Entry deleted correctly')
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default router
