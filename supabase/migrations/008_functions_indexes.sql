-- Update profile updated_at
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger set_ratings_updated_at
  before update on public.ratings
  for each row execute function public.update_updated_at();

create trigger set_collections_updated_at
  before update on public.collections
  for each row execute function public.update_updated_at();

-- Full-text search on movie titles in collections
create or replace function public.search_collections(search_query text, user_id uuid)
returns table (
  collection_id bigint,
  collection_name text,
  movie_id bigint,
  movie_title text,
  poster_path text
)
language plpgsql
as $$
begin
  return query
  select
    c.id as collection_id,
    c.name as collection_name,
    ci.movie_id,
    ci.movie_title,
    ci.poster_path
  from public.collections c
  join public.collection_items ci on ci.collection_id = c.id
  where c.user_id = search_collections.user_id
    and ci.movie_title ilike '%' || search_query || '%'
  order by ci.movie_title
  limit 20;
end;
$$;

-- Get user stats
create or replace function public.get_user_stats(user_id uuid)
returns table (
  watchlist_count bigint,
  ratings_count bigint,
  avg_rating numeric,
  collections_count bigint,
  viewing_history_count bigint
)
language plpgsql
security definer
as $$
begin
  return query
  select
    (select count(*) from public.watchlists w where w.user_id = get_user_stats.user_id) as watchlist_count,
    (select count(*) from public.ratings r where r.user_id = get_user_stats.user_id) as ratings_count,
    (select coalesce(avg(r.rating), 0) from public.ratings r where r.user_id = get_user_stats.user_id)::numeric(3,1) as avg_rating,
    (select count(*) from public.collections c where c.user_id = get_user_stats.user_id) as collections_count,
    (select count(*) from public.viewing_history v where v.user_id = get_user_stats.user_id) as viewing_history_count;
end;
$$;

-- Additional indexes for performance
create index if not exists idx_collections_created_at on public.collections(created_at desc);
create index if not exists idx_collection_items_added_at on public.collection_items(added_at desc);
create index if not exists idx_profiles_username on public.profiles(username) where username is not null;
