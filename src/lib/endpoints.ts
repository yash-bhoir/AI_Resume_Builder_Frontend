export const BASE_URL = "http://localhost:8080/api/v1/";

export const OPEN_AI_ENDPOINTS = {
  PROMPT_TO_HTML_TEMPLATE_COMPLETIONS: `${BASE_URL}openAi/createHtmlTemplate`,
};

export const USER_ENDPOINTS = {
  USER_REGISTER: `${BASE_URL}users/register`,
}

export const FEEDBACK_ENDPOINTS = {
    GET_FEEDBACK : `${BASE_URL}feedback/GetFeedback`
}

export const RESUME_ENDPOINTS = {
  RESUME_CREATE: `${BASE_URL}resume/create`,
  RESUME_TEMPLATE_NAME_UNIQUE: `${BASE_URL}resume/unique-template-name`,
  RESUME_GET_ALL: `${BASE_URL}resume/get-all-resume`,
  RESUME_DELETE_BY_ID: `${BASE_URL}resume/delete-resume-by-id`,
  RESUME_GET_BY_ID: `${BASE_URL}resume/get-resume-by-id`,
  RESUME_UPDATE: `${BASE_URL}resume/update`,
  RESUME_GET_ALL_CONVERSATIONS: `${BASE_URL}resume/get-all-conversation`,
}