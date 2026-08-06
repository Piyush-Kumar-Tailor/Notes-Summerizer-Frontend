export interface Summary {

  id: number;

  fileName: string;

  pages: number;

  aiModel: string;

  processingTime: string;

  summary: string;

  keyPoints: string[];

  flashcards: Flashcard[];

  quiz: QuizQuestion[];

  interviewQuestions: InterviewQuestion[];

  summaryLength: string;

  uploadedAt: string;

}

export interface Flashcard {

  question: string;

  answer: string;

}

export interface QuizQuestion {

  question: string;

  options: string[];

  correctAnswer: string;

}

export interface InterviewQuestion {

  question: string;

  answer: string;

}

export interface HistoryItem {

  id: number;

  fileName: string;

  pages: number;

  aiModel: string;

  summaryLength: string;

  createdAt: string;

}
export interface ApiResponse<T> {

  success: boolean;

  message: string;

  data: T;

}