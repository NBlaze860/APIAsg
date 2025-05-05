import { Link } from 'react-router-dom'
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import PropTypes from 'prop-types'

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

function NoteCard({ note, onDelete }) {
  const cardStyle = {
    borderTop: `4px solid ${note.color || '#3B82F6'}`
  }
  
  return (
    <div 
      className="card group transition-all duration-300 hover:-translate-y-1"
      style={cardStyle}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-neutral-900 line-clamp-1">
            {note.title}
          </h3>
          <span className="bg-neutral-100 text-neutral-700 text-xs font-medium px-2 py-1 rounded">
            {note.category}
          </span>
        </div>
        
        <p className="text-neutral-600 mb-4 line-clamp-3">
          {truncateText(note.content, 150)}
        </p>
        
        <div className="flex items-center justify-between">
          <p className="text-xs text-neutral-500">
            {formatDate(note.createdAt)}
          </p>
          
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link
              to={`/notes/${note._id}`}
              className="p-1.5 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition"
              aria-label="View note"
            >
              <FiEye className="text-lg" />
            </Link>
            
            <Link
              to={`/notes/${note._id}/edit`}
              className="p-1.5 text-neutral-600 hover:text-secondary-600 hover:bg-secondary-50 rounded-md transition"
              aria-label="Edit note"
            >
              <FiEdit2 className="text-lg" />
            </Link>
            
            <button
              onClick={() => onDelete(note._id)}
              className="p-1.5 text-neutral-600 hover:text-error-600 hover:bg-error-50 rounded-md transition"
              aria-label="Delete note"
            >
              <FiTrash2 className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

NoteCard.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string,
    color: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
}

export default NoteCard