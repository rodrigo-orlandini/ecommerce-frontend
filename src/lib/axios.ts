import axios from 'axios';

const apiBaseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

axios.defaults.baseURL = apiBaseURL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
