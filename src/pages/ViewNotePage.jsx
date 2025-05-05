import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi'
import Button from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { fetchNoteById, deleteNote } from '../services/noteService'

function formatDate(dateString) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function ViewNotePage() {
  const [note, setNote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
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
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id)
        toast.success('Note deleted successfully')
        navigate('/')
      } catch (error) {
        toast.error('Failed to delete note')
        console.error('Error deleting note:', error)
      }
    }
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="large" />
      </div>
    )
  }
  
  const headerStyle = {
    borderColor: note.color || '#3B82F6'
  }
  
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost"
          size="small"
          onClick={() => navigate(-1)}
          icon={<FiArrowLeft />}
          className="mr-2"
        >
          Back
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden animate-scale-in">
        <div 
          className="p-6 border-b-4" 
          style={headerStyle}
        >
          <div className="flex justify-between items-start">
            <h1 className="text-neutral-900">{note.title}</h1>
            <span className="bg-neutral-100 text-neutral-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {note.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="prose max-w-none pb-6 border-b border-neutral-200">
            <p className="whitespace-pre-line">{note.content}</p>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-neutral-600">
              <p>Created: {formatDate(note.createdAt)}</p>
              {note.updatedAt !== note.createdAt && (
                <p>Updated: {formatDate(note.updatedAt)}</p>
              )}
            </div>
            
            <div className="flex gap-3">
              <Link to={`/notes/${id}/edit`}>
                <Button 
                  variant="secondary"
                  icon={<FiEdit2 />}
                >
                  Edit
                </Button>
              </Link>
              
              <Button 
                variant="danger"
                onClick={handleDelete}
                icon={<FiTrash2 />}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewNotePage