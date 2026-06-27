create table if not exists public.collection_items (
  id bigint primary key generated always as identity,
  collection_id bigint references public.collections(id) on delete cascade not null,
  movie_id bigint not null,
  movie_title text not null,
  poster_path text,
  added_at timestamptz default now(),
  unique(collection_id, movie_id)
);

create index if not exists idx_collection_items_collection_id on public.collection_items(collection_id);
