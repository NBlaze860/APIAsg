import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NoteForm from '../components/notes/NoteForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { fetchNoteById, updateNote } from '../services/noteService'

function EditNotePage() {
  const [note, setNote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchNote()
  }, [id])
  
  const fetchNote = async () => {
    try {
      setIsLoading(true)
      const data = await fetchNoteById(id)
      setNote(data)
    } catch (error) {
      toast.error('Failed to fetch note')
      navigate('/')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true)
      await updateNote(id, formData)
      toast.success('Note updated successfully')
      navigate(`/notes/${id}`)
    } catch (error) {
      toast.error('Failed to update note')
      console.error('Error updating note:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="large" />
      </div>
    )
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-neutral-900">Edit Note</h1>
        <p className="text-neutral-600 mt-1">
          Update your note details
        </p>
      </div>
      
      <NoteForm 
        note={note} 
        onSubmit={handleSubmit} 
        isLoading={isSubmitting} 
      />
    </div>
  )
}

export default EditNotePage