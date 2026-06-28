-- Create watchlists table
CREATE TABLE IF NOT EXISTS watchlists (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  movie_id bigint NOT NULL,
  movie_title text NOT NULL,
  poster_path text,
  backdrop_path text,
  tmdb_rating numeric(4,1),
  release_date text,
  genres text,
  watched boolean DEFAULT false,
  added_at timestamptz DEFAULT now()
);

-- Create collections table
CREATE TABLE IF NOT EXISTS collections (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create collection_items table
CREATE TABLE IF NOT EXISTS collection_items (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  collection_id bigint REFERENCES collections ON DELETE CASCADE NOT NULL,
  movie_id bigint NOT NULL,
  movie_title text NOT NULL,
  poster_path text,
  added_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for watchlists
CREATE POLICY "Users can manage their own watchlist" ON watchlists
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for collections
CREATE POLICY "Users can manage their own collections" ON collections
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for collection_items
CREATE POLICY "Users can manage their own collection items" ON collection_items
  FOR ALL USING (
    collection_id IN (SELECT id FROM collections WHERE user_id = auth.uid())
  );
