create table if not exists public.watchlists (
  id bigint primary key generated always as identity,
  user_id uuid references public.profiles(id) on delete cascade not null,
  movie_id bigint not null,
  movie_title text not null,
  poster_path text,
  backdrop_path text,
  tmdb_rating numeric(3,1),
  release_date text,
  genres integer[] default '{}',
  watched boolean default false,
  added_at timestamptz default now(),
  unique(user_id, movie_id)
);

create index if not exists idx_watchlists_user_id on public.watchlists(user_id);
create index if not exists idx_watchlists_added_at on public.watchlists(added_at desc);
