import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import * as admin from 'firebase-admin'

import authRoutes from './routes/auth'
import lectureRoutes from './routes/lectures'
import mcqRoutes from './routes/mcq'
import notesRoutes from './routes/notes'
import testRoutes from './routes/tests'
import performanceRoutes from './routes/performance'
import adminRoutes from './routes/admin'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  })
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/soulofmedico')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/lectures', lectureRoutes)
app.use('/api/mcq', mcqRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api/tests', testRoutes)
app.use('/api/performance', performanceRoutes)
app.use('/api/admin', adminRoutes)

// AI Chat endpoint
app.get('/ai-chat', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>AI Mentor</title>
      <style>
        body { font-family: Arial; margin: 0; padding: 10px; }
        .chat-container { height: 100%; display: flex; flex-direction: column; }
        .messages { flex: 1; overflow-y: auto; padding: 10px; }
        .message { margin: 10px 0; padding: 10px; border-radius: 5px; }
        .user { background: #e3f2fd; }
        .ai { background: #f5f5f5; }
        .input-area { display: flex; gap: 10px; padding: 10px; }
        input { flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
        button { padding: 10px 20px; background: #0052CC; color: white; border: none; border-radius: 5px; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="chat-container">
        <div class="messages" id="messages">
          <div class="message ai">Hi! I'm your AI Mentor. Ask me anything about NEET preparation!</div>
        </div>
        <div class="input-area">
          <input type="text" id="messageInput" placeholder="Ask a question...">
          <button onclick="sendMessage()">Send</button>
        </div>
      </div>
      <script>
        function sendMessage() {
          const input = document.getElementById('messageInput');
          if (input.value.trim()) {
            const div = document.createElement('div');
            div.className = 'message user';
            div.textContent = input.value;
            document.getElementById('messages').appendChild(div);
            
            // AI Response (mock for now)
            setTimeout(() => {
              const aiDiv = document.createElement('div');
              aiDiv.className = 'message ai';
              aiDiv.textContent = 'This is a great question! Let me help you understand this concept...';
              document.getElementById('messages').appendChild(aiDiv);
            }, 500);
            
            input.value = '';
          }
        }
      </script>
    </body>
    </html>
  `)
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
