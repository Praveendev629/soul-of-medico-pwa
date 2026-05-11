import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth APIs
export const saveUser = (userData: any) =>
  apiClient.post('/api/auth/save-user', userData)

export const getUser = (uid: string) =>
  apiClient.get(`/api/auth/user/${uid}`)

// Lectures APIs
export const getLectures = (subject?: string) =>
  apiClient.get('/api/lectures', { params: { subject } })

export const getLectureById = (id: string) =>
  apiClient.get(`/api/lectures/${id}`)

// MCQ APIs
export const getDailyMCQ = () =>
  apiClient.get('/api/mcq/daily')

export const submitMCQAnswers = (answers: any) =>
  apiClient.post('/api/mcq/submit', answers)

export const getMCQHistory = (userId: string) =>
  apiClient.get(`/api/mcq/history/${userId}`)

// Notes APIs
export const getNotesBySubject = (subject: string) =>
  apiClient.get(`/api/notes/${subject}`)

export const getLessonNotes = (subject: string, lesson: string) =>
  apiClient.get(`/api/notes/${subject}/${lesson}`)

// Test Series APIs
export const getTestSeries = () =>
  apiClient.get('/api/tests')

export const getTestById = (id: string) =>
  apiClient.get(`/api/tests/${id}`)

export const submitTest = (testData: any) =>
  apiClient.post('/api/tests/submit', testData)

export const getTestResults = (userId: string) =>
  apiClient.get(`/api/tests/results/${userId}`)

// Performance APIs
export const getPerformanceDashboard = (userId: string) =>
  apiClient.get(`/api/performance/${userId}`)

export const updateStudyStreak = (userId: string) =>
  apiClient.post(`/api/performance/streak/${userId}`)

export const getWeakTopics = (userId: string) =>
  apiClient.get(`/api/performance/weak-topics/${userId}`)

// Admin APIs
export const updateLecture = (id: string, data: any) =>
  apiClient.put(`/api/admin/lectures/${id}`, data)

export const createMCQ = (data: any) =>
  apiClient.post('/api/admin/mcq', data)

export const createTest = (data: any) =>
  apiClient.post('/api/admin/tests', data)
