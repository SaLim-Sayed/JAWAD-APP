export interface Playlist {
  num: number;
  name: string;
  stream_type: "live";
  stream_id: number;
  stream_icon: string;
  epg_channel_id: string | null;
  added: string;
  category_id: string;
  custom_sid: string;
  tv_archive: number;
  direct_source: string;
  tv_archive_duration: number;
}


export type TPlaylist = {
  _id: string;
  name: string;
  url: string;
  isActive: boolean;
  isProtected: boolean;
  userId: string;
  __v: number;
};

export type AddPlaylistResponse = {
  message: string;
  playlist: TPlaylist;
  allPlaylists: TPlaylist[] | undefined;
};
export type GetPlaylistResponse = {
  message: string;
  playlists: TPlaylist[] | undefined;
};
