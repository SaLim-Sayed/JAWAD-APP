export interface TSeries {
    backdrop_path: string[];
    cast: string;
    category_id: string;
    category_ids: string[];
    cover: string;
    director: string;
    episode_run_time: string;
    genre: string;
    last_modified: string;
    name: string;
    num: number;
    plot: string;
    rating: string;
    rating_5based: string;
    releaseDate: string;
    series_id: number;
    tmdb: string;
    youtube_trailer: string;
    season?: number;
    stream_id?: number;
  }


  interface VideoStreamInfo {
    index: number;
    codec_name: string;
    codec_long_name: string;
    profile: string;
    codec_type: string;
    codec_tag_string: string;
    codec_tag: string;
    width?: number;
    height?: number;
    coded_width?: number;
    coded_height?: number;
    closed_captions?: number;
    film_grain?: number;
    has_b_frames?: number;
    sample_aspect_ratio?: string;
    display_aspect_ratio?: string;
    pix_fmt?: string;
    level?: number;
    chroma_location?: string;
    field_order?: string;
    refs?: number;
    is_avc?: string;
    nal_length_size?: string;
    r_frame_rate?: string;
    avg_frame_rate?: string;
    time_base?: string;
    start_pts?: number;
    start_time?: string;
    bits_per_raw_sample?: string;
    extradata_size?: number;
    disposition: {
      default: number;
      dub: number;
      original: number;
      comment: number;
      lyrics: number;
      karaoke: number;
      forced: number;
      hearing_impaired: number;
      visual_impaired: number;
      clean_effects: number;
      attached_pic: number;
      timed_thumbnails: number;
      captions: number;
      descriptions: number;
      metadata: number;
      dependent: number;
      still_image: number;
    };
    tags: {
      BPS?: string;
      DURATION?: string;
      NUMBER_OF_FRAMES?: string;
      NUMBER_OF_BYTES?: string;
      _STATISTICS_WRITING_APP?: string;
      _STATISTICS_WRITING_DATE_UTC?: string;
      _STATISTICS_TAGS?: string;
      language?: string;
    };
    sample_fmt?: string;
    sample_rate?: string;
    channels?: number;
    channel_layout?: string;
    bits_per_sample?: number;
  }
  
  interface EpisodeInfo {
    air_date: string;
    crew: string;
    rating: number;
    id: number;
    movie_image: string;
    duration_secs: number;
    duration: string;
    video: VideoStreamInfo;
    audio: VideoStreamInfo;
    bitrate: number;
  }
  
  interface Episode {
    id: string;
    episode_num: number;
    title: string;
    container_extension: string;
    info: EpisodeInfo;
    custom_sid: null;
    added: string;
    season: number;
    direct_source: string;
  }
  
  interface Season {
    name: string;
    episode_count: string;
    overview: string;
    air_date: string;
    cover: string;
    cover_tmdb: string;
    season_number: number;
    cover_big: string;
    releaseDate: string;
    duration: string;
  }
  
  interface MovieInfo {
    name: string;
    cover: string;
    plot: string;
    cast: string;
    director: string;
    genre: string;
    releaseDate: string;
    release_date: string;
    last_modified: string;
    rating: string;
    rating_5based: string;
    backdrop_path: string[];
    tmdb: string;
    youtube_trailer: string;
    episode_run_time: string;
    category_id: string;
    category_ids: number[];
  }
  
  interface Episodes {
    [key: string]: Episode[];
  }
  
  export interface SeriesData {
    seasons: Season[];
    info: MovieInfo;
    episodes: Episodes;
  }
