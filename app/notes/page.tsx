import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteClient from "./Notes.client";

const debouncedSearch = "";
const page = 1;

const NoteDetails = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ search: debouncedSearch, page }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;