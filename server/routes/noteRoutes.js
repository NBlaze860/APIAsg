import express from 'express'
import Note from '../models/Note.js'

const router = express.Router()

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 })
    res.json(notes)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error: error.message })
  }
})

// GET a single note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }
    
    res.json(note)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note', error: error.message })
  }
})

// CREATE a new note
router.post('/', async (req, res) => {
  try {
    const { title, content, category, color } = req.body
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }
    
    const newNote = new Note({
      title,
      content,
      category,
      color
    })
    
    const savedNote = await newNote.save()
    res.status(201).json(savedNote)
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error: error.message })
  }
})

// UPDATE a note
router.put('/:id', async (req, res) => {
  try {
    const { title, content, category, color } = req.body
    
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }
    
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, category, color },
      { new: true, runValidators: true }
    )
    
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' })
    }
    
    res.json(updatedNote)
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error: error.message })
  }
})

// DELETE a note
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    
    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' })
    }
    
    res.json({ message: 'Note deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error: error.message })
  }
})

export default router