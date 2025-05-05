import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NoteForm from '../components/notes/NoteForm'
import { createNote } from '../services/noteService'

function CreateNotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true)
      await createNote(formData)
      toast.success('Note created successfully')
      navigate('/')
    } catch (error) {
      toast.error('Failed to create note')
      console.error('Error creating note:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-neutral-900">Create Note</h1>
        <p className="text-neutral-600 mt-1">
          Add a new note to your collection
        </p>
      </div>
      
      <NoteForm 
        onSubmit={handleSubmit} 
        isLoading={isSubmitting} 
      />
    </div>
  )
}

export default CreateNotePage