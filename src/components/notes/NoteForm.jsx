import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiSave, FiX } from 'react-icons/fi'
import Button from '../ui/Button'
import LoadingSpinner from '../ui/LoadingSpinner'
import PropTypes from 'prop-types'

const CATEGORIES = ['Work', 'Personal', 'Ideas', 'Tasks', 'Other']

function NoteForm({ note = null, onSubmit, isLoading = false }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Other',
    color: '#FFFFFF'
  })
  
  const [errors, setErrors] = useState({})
  const titleRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        category: note.category || 'Other',
        color: note.color || '#FFFFFF'
      })
    }
    
    // Focus on title input when component mounts
    if (titleRef.current) {
      titleRef.current.focus()
    }
  }, [note])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters'
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    } else {
      toast.error('Please fix the errors in the form')
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 animate-scale-in">
      <div className="mb-6">
        <label 
          htmlFor="title" 
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          value={formData.title}
          onChange={handleChange}
          placeholder="Note title"
          className={`input ${errors.title ? 'border-error-500 focus:ring-error-500' : ''}`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-error-600">{errors.title}</p>
        )}
      </div>

      <div className="mb-6">
        <label 
          htmlFor="content" 
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your note here..."
          rows="6"
          className={`textarea ${errors.content ? 'border-error-500 focus:ring-error-500' : ''}`}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-error-600">{errors.content}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label 
            htmlFor="category" 
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input"
          >
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label 
            htmlFor="color" 
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="h-10 w-10 rounded border border-neutral-300 cursor-pointer"
            />
            <span className="text-sm text-neutral-600">{formData.color}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button 
          type="button" 
          variant="outline"
          onClick={handleCancel}
          icon={<FiX />}
        >
          Cancel
        </Button>
        
        <Button 
          type="submit" 
          variant="primary"
          isLoading={isLoading}
          icon={<FiSave />}
        >
          {note ? 'Update Note' : 'Create Note'}
        </Button>
      </div>
    </form>
  )
}

NoteForm.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.string,
    color: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default NoteForm