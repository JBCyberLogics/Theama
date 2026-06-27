-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.watchlists enable row level security;
alter table public.ratings enable row level security;
alter table public.viewing_history enable row level security;
alter table public.collections enable row level security;
alter table public.collection_items enable row level security;

-- Profiles: users can read any profile, update only their own
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Watchlists: users CRUD own items
create policy "Users can view own watchlist"
  on public.watchlists for select
  using (auth.uid() = user_id);

create policy "Users can insert own watchlist"
  on public.watchlists for insert
  with check (auth.uid() = user_id);

create policy "Users can update own watchlist"
  on public.watchlists for update
  using (auth.uid() = user_id);

create policy "Users can delete own watchlist"
  on public.watchlists for delete
  using (auth.uid() = user_id);

-- Ratings: users CRUD own ratings
create policy "Users can view own ratings"
  on public.ratings for select
  using (auth.uid() = user_id);

create policy "Users can insert own ratings"
  on public.ratings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own ratings"
  on public.ratings for update
  using (auth.uid() = user_id);

create policy "Users can delete own ratings"
  on public.ratings for delete
  using (auth.uid() = user_id);

-- Viewing history: users view/insert own history
create policy "Users can view own history"
  on public.viewing_history for select
  using (auth.uid() = user_id);

create policy "Users can insert own history"
  on public.viewing_history for insert
  with check (auth.uid() = user_id);

-- Collections: users CRUD own collections
create policy "Users can view own collections"
  on public.collections for select
  using (auth.uid() = user_id);

create policy "Users can insert own collections"
  on public.collections for insert
  with check (auth.uid() = user_id);

create policy "Users can update own collections"
  on public.collections for update
  using (auth.uid() = user_id);

create policy "Users can delete own collections"
  on public.collections for delete
  using (auth.uid() = user_id);

-- Collection items: users CRUD items in own collections
create policy "Users can view own collection items"
  on public.collection_items for select
  using (
    exists (
      select 1 from public.collections
      where id = collection_id and user_id = auth.uid()
    )
  );

create policy "Users can insert own collection items"
  on public.collection_items for insert
  with check (
    exists (
      select 1 from public.collections
      where id = collection_id and user_id = auth.uid()
    )
  );

create policy "Users can delete own collection items"
  on public.collection_items for delete
  using (
    exists (
      select 1 from public.collections
      where id = collection_id and user_id = auth.uid()
    )
  );
