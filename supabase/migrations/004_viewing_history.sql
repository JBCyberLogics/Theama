create table if not exists public.viewing_history (
  id bigint primary key generated always as identity,
  user_id uuid references public.profiles(id) on delete cascade not null,
  movie_id bigint not null,
  movie_title text not null,
  poster_path text,
  watched_at timestamptz default now(),
  unique(user_id, movie_id, watched_at)
);

create index if not exists idx_viewing_history_user_id on public.viewing_history(user_id);
create index if not exists idx_viewing_history_watched_at on public.viewing_history(watched_at desc);
