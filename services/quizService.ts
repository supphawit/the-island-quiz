import axiosInstance from "@/lib/axios";
import { AnswerRequest, AnswerResponse, QuestionType } from "@/types/quiz";

export const submitAnswer = async ({
  sessionId,
  questionId,
  choiceId,
  timeSpent,
}: AnswerRequest): Promise<AnswerResponse> => {
  try {
    const response = await axiosInstance.post(`/Quiz/Answer`, {
      sessionId,
      questionId,
      choiceId,
      timeSpent,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to submit answer:", error);
    throw error;
  }
};

export const createSession = async (): Promise<string> => {
  const response = await axiosInstance.post(`/Quiz/Session`);
  return response.data.data.sessionId;
};

export const fetchQuestion = async (
  sessionId: string
): Promise<QuestionType> => {
  const response = await axiosInstance.get(`/Quiz/Questions/${sessionId}`);
  return response.data.data;
};
