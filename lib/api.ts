import axios from 'axios';
import type { Note, createNoteRequest } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

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

export const createNote = async (note: createNoteRequest): Promise<Note> => {
  const res = await api.post<Note>('/notes', note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};
