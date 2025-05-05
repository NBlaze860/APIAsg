import { useState } from 'react'
import NoteCard from './NoteCard'
import LoadingSpinner from '../ui/LoadingSpinner'
import { FiFilter, FiSearch, FiX } from 'react-icons/fi'
import PropTypes from 'prop-types'

const CATEGORIES = ['All', 'Work', 'Personal', 'Ideas', 'Tasks', 'Other']

function NotesList({ notes, isLoading, onDeleteNote }) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) || 
                         note.content.toLowerCase().includes(search.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })
  
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
  
  const clearSearch = () => {
    setSearch('')
  }
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-neutral-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search notes..."
              className="input pl-10 pr-10"
            />
            {search && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
              >
                <FiX />
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <FiFilter className="text-neutral-500 flex-shrink-0" />
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-primary-100 text-primary-800 font-medium'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 rounded-lg border border-dashed border-neutral-300">
          <h3 className="text-lg font-medium text-neutral-700 mb-2">No notes found</h3>
          <p className="text-neutral-600">
            {notes.length === 0
              ? "You haven't created any notes yet."
              : "No notes match your current search or filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map(note => (
            <NoteCard 
              key={note._id} 
              note={note} 
              onDelete={onDeleteNote} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onDeleteNote: PropTypes.func.isRequired
}

export default NotesList