import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// AUTH
export const saveUser = (userData: any) =>
  apiClient.post('/api/auth/save-user', userData)

export const getUser = (uid: string) =>
  apiClient.get(`/api/auth/user/${uid}`)

// LECTURES
export const getLectures = (subject?: string) =>
  apiClient.get('/api/lectures', { params: { subject } })

export const getLectureById = (id: string) =>
  apiClient.get(`/api/lectures/${id}`)

// MCQs
export const getDailyMCQ = (count: number = 5) =>
  apiClient.get(`/api/mcq/daily?count=${count}`)

export const getMCQsBySubject = (subject: string) =>
  apiClient.get(`/api/mcq/subject/${subject}`)

export const submitMCQAnswers = (userId: string, answers: any[]) =>
  apiClient.post('/api/mcq/submit', { userId, answers })

export const getMCQHistory = (userId: string) =>
  apiClient.get(`/api/mcq/history/${userId}`)

// NOTES
export const getNotesBySubject = (subject: string) =>
  apiClient.get(`/api/notes/${subject}`)

export const getLessonNotes = (subject: string, lesson: string) =>
  apiClient.get(`/api/notes/${subject}/${lesson}`)

// TESTS
export const getTestSeries = () =>
  apiClient.get('/api/tests')

export const getTestById = (id: string) =>
  apiClient.get(`/api/tests/${id}`)

export const submitTest = (userId: string, testData: any) =>
  apiClient.post('/api/tests/submit', { userId, ...testData })

export const getTestResults = (userId: string) =>
  apiClient.get(`/api/tests/results/${userId}`)

// PERFORMANCE
export const getPerformanceDashboard = (userId: string) =>
  apiClient.get(`/api/performance/${userId}`)

export const updateStudyStreak = (userId: string) =>
  apiClient.post(`/api/performance/streak/${userId}`)

export const getWeakTopics = (userId: string) =>
  apiClient.get(`/api/performance/weak-topics/${userId}`)
