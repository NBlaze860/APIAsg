import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
      trim: true
    },
    category: {
      type: String,
      enum: ['Work', 'Personal', 'Ideas', 'Tasks', 'Other'],
      default: 'Other'
    },
    color: {
      type: String,
      default: '#3B82F6'
    }
  },
  { 
    timestamps: true 
  }
)

// Add text index for search functionality
NoteSchema.index({ title: 'text', content: 'text' })

// Export the model if it doesn't already exist
export default mongoose.models.Note || mongoose.model('Note', NoteSchema)