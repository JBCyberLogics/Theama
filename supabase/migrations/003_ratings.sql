create table if not exists public.ratings (
  id bigint primary key generated always as identity,
  user_id uuid references public.profiles(id) on delete cascade not null,
  movie_id bigint not null,
  movie_title text,
  poster_path text,
  backdrop_path text,
  rating smallint not null check (rating >= 1 and rating <= 10),
  review text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, movie_id)
);

create index if not exists idx_ratings_user_id on public.ratings(user_id);
create index if not exists idx_ratings_movie_id on public.ratings(movie_id);
create index if not exists idx_ratings_rating on public.ratings(rating desc);
