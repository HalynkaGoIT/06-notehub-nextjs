import axios from 'axios';
import type { Note, CreateNoteRequest } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${myToken}`,
  },
});

export const fetchNotes = async ({
  page = 1,
  perPage = 10,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search },
  });
  return res.data;
};

export const createNote = async (note: CreateNoteRequest): Promise<Note> => {
  const res = await api.post<Note>('/notes', note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const res = await api.delete<{ id: string }>(`/notes/${id}`);
  return res.data;
};
