import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiPlus } from 'react-icons/fi'
import NotesList from '../components/notes/NotesList'
import Button from '../components/ui/Button'
import { fetchAllNotes, deleteNote } from '../services/noteService'

function NotesPage() {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    fetchNotes()
  }, [])
  
  const fetchNotes = async () => {
    try {
      setIsLoading(true)
      const data = await fetchAllNotes()
      setNotes(Array.isArray(data) ? data : [])
    } catch (error) {
      setNotes([])
      toast.error('Failed to fetch notes')
      console.error('Error fetching notes:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(noteId)
        setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId))
        toast.success('Note deleted successfully')
      } catch (error) {
        toast.error('Failed to delete note')
        console.error('Error deleting note:', error)
      }
    }
  }
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-neutral-900">My Notes</h1>
          <p className="text-neutral-600 mt-1">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'} available
          </p>
        </div>
        
        <Link to="/notes/new">
          <Button 
            variant="primary"
            icon={<FiPlus />}
          >
            Create Note
          </Button>
        </Link>
      </div>
      
      <NotesList 
        notes={notes} 
        isLoading={isLoading} 
        onDeleteNote={handleDeleteNote} 
      />
    </div>
  )
}

export default NotesPage