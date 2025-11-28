import { useEffect, useState } from 'react';
import css from './App.module.css';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import toast, { Toaster } from 'react-hot-toast';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NoteList from '../NoteList/NoteList';

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 400);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const handleChange = (noteSearch: string) => {
    setSearch(noteSearch.trim());
    setPage(1);
  };

  const notesArr = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handlePageChange = (selected: number) => {
    setPage(selected);
  };

  useEffect(() => {
    if (data && notesArr.length === 0) {
      toast.error('No notes found for your request');
    }
  }, [data, notesArr.length, isSuccess, debouncedSearch]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleChange} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
        {isModalOpen && (
          <Modal onClose={handleModalClose}>
            <NoteForm onClose={handleModalClose} />
          </Modal>
        )}
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && notesArr.length !== 0 && <NoteList notes={notesArr} />}
      <Toaster />
    </div>
  );
}
