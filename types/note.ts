export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: noteTag;
}

export type noteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface createNoteRequest {
  title: string;
  content: string;
  tag: noteTag;
}
