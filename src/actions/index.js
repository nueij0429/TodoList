import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;
const apiUrl = `${BASE_URL}/todos`
//'http://localhost:4500/api/todos';

//Action type 정의
export const FETCH_TODOS = "FETCH_TODOS";