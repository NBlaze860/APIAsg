import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import noteRoutes from './routes/noteRoutes.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow frontend dev server
  credentials: true
}))
app.use(express.json())

// Mount routes under /api prefix
app.use('/api/notes', noteRoutes)

// Health check route - moved under /api prefix
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' })
})

// Root route
app.get('/', (req, res) => {
  res.send('NoteFlow API')
})

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connected to MongoDB')
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
  }
}

startServer()

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close()
    console.log('MongoDB connection closed')
    process.exit(0)
  } catch (error) {
    console.error('Error during shutdown:', error)
    process.exit(1)
  }
})