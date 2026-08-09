import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/interview';

export const startInterview = async (candidateId, profile, curriculum) => {
  const response = await axios.post(`${API_BASE_URL}/start`, {
    candidate_id: candidateId,
    candidate_profile: profile,
    curriculum: curriculum,
  });
  return response.data;
};

export const submitAnswer = async (sessionId, userMessage) => {
  const response = await axios.post(`${API_BASE_URL}/respond`, {
    session_id: sessionId,
    user_message: userMessage,
  });
  return response.data;
};