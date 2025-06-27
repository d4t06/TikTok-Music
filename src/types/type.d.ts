type Song = {
  id: string;
  name: string;
  image_url: string;
  image_file_path: string;
  song_url: string;
  song_file_path: string;
  beat_url: string;
  beat_file_path: string;
  owner_email: string;
  distributor: string;
  is_official: boolean;
  duration: number;
  like: number;
  lyric_id: string;
  blurhash_encode: string;
  singers: Singer[];
  singer_map: Record<string, boolean>;
  genres: Genre[];
  genre_map: Record<string, boolean>;
  size: number;
  queue_id: string;
  updated_at: Timestamp;
  created_at: Timestamp;
};

type SongLyric = {
  id: string;
  base: string;
  lyrics: Lyric[];
};

type Lyric = {
  start: number;
  end: number;
  text: string;
  tune: LyricTune;
  cut: number[][];
};

type LyricTune = {
  grow: number[];
  end: number;
  start: number;
};

type SongLyricSchema = Omit<SongLyric, "lyrics" | "id"> & {
  lyrics: string;
};

type LyricStatus = "active" | "done" | "coming";



type UserComment = {
  id: string;
  user_email: string;
  user_name: string;
  user_image_url: string;
  text: string;
  target_id: string;
  comment_id: string;
  like: number;
  reply: number;
  replies: UserComment[];
  updated_at: Timestamp;
  created_at: Timestamp;
};
