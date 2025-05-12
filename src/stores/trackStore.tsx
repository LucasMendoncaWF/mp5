/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { PlaylistModel, TrackModel } from '@/models/tracks';

interface TrackStore {
  playlists: PlaylistModel[];
  openDeletePlayListModalId: string | null;
  currentTrack: TrackModel | null;
  currentPlayList: PlaylistModel;
  isShuffleActive: boolean;
  isRepeatActive: boolean;
  isPlaying: boolean;
  isAddingPlaylist: boolean;
  playedSongs: string[];
  setUserPlaylists: (playlists: PlaylistModel[]) => void;
  addPlayList: (playlist: PlaylistModel) => void;
  setOpenRemovePlayListModal: (id: string) => void;
  onCloseRemovePlayListModal: () => void;
  removePlayList: (id: string) => void;
  setCurrentPlayList: (playList: PlaylistModel) => void;
  setCurrentTrack: (track: TrackModel) => void;
  setSingleTrack: (track: TrackModel) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  togglePlay: () => void;
  getCurrentMusicSiblings: () => { hasNext?: boolean; hasPrev?: boolean; index?: number };
  setPlaying: (value: boolean) => void;
  addOrRemoveToQueue: (track: TrackModel) => void;
  toggleIsAddingPlaylist: (value: boolean) => void;
  setPlayedSongs: (value: string[]) => void;
}

const useTrackStore = create<TrackStore>()(
  persist(
    (set, get) => ({
      isPlaying: false,
      playlists: [],
      openDeletePlayListModalId: null,
      isAddingPlaylist: false,
      currentTrack: null,
      currentPlayList: {},
      isShuffleActive: false,
      isRepeatActive: false,
      playedSongs: [],
      addPlayList: (playlist: PlaylistModel) => {
        const storePlaylists = get().playlists;
        if (!storePlaylists.find((item) => item.id === playlist.id)) {
          set({ playlists: [...storePlaylists, playlist] });
        }
      },
      setOpenRemovePlayListModal: (id: string) => {
        set({ openDeletePlayListModalId: id });
      },
      onCloseRemovePlayListModal: () => {
        set({ openDeletePlayListModalId: null });
      },
      removePlayList: (id: string) => {
        const storePlaylists = get().playlists;
        set({ playlists: storePlaylists.filter((item) => item.id !== id) });
      },
      setUserPlaylists: (playlists: PlaylistModel[]) => {
        const newPlaylists = [...playlists, ...get().playlists];
        const newSet = new Set();
        const uniqueById = newPlaylists.filter((item) => {
          if (newSet.has(item.id)) return false;
          newSet.add(item.id);
          return true;
        });
        set({ playlists: uniqueById });
      },
      setCurrentPlayList: (playlist: PlaylistModel) => {
        if (playlist.tracks) {
          set({ currentPlayList: playlist, currentTrack: playlist.tracks[0] });
        }
      },
      setCurrentTrack: (newTrack: TrackModel) => {
        set({ currentTrack: newTrack });
      },
      setSingleTrack: (newTrack: TrackModel) => {
        set({
          currentTrack: newTrack,
          currentPlayList: { tracks: [newTrack], id: newTrack.id + '_playlist' },
        });
      },
      toggleShuffle: () => {
        set({ isShuffleActive: !get().isShuffleActive });
      },
      toggleRepeat: () => {
        set({ isRepeatActive: !get().isRepeatActive });
      },
      togglePlay: () => {
        set({ isPlaying: !get().isPlaying });
      },
      setPlaying: (value: boolean) => {
        set({ isPlaying: value });
      },
      getCurrentMusicSiblings: () => {
        const index = get().currentPlayList?.tracks?.findIndex(
          (track) => get().currentTrack?.id === track.id,
        );
        if (index === undefined || index < 0) return {};
        const hasPrev = index > 0;
        const currentPlayListTracksLength = get().currentPlayList?.tracks?.length || 0;
        const hasNext = index >= 0 && index < currentPlayListTracksLength - 1;

        return {
          hasPrev,
          hasNext,
          index,
        };
      },
      addOrRemoveToQueue: (track: TrackModel) => {
        if (track.id === get().currentTrack?.id) return;

        const currentPlayList = get().currentPlayList;
        const newPlayList = currentPlayList?.tracks ? { ...get().currentPlayList } : { tracks: [] };

        if (get().currentTrack?.id === track.id) {
          return;
        }

        const index = newPlayList.tracks?.findIndex((item) => item.id === track.id);
        if (index === undefined || index < 0) {
          newPlayList.tracks?.push(track);
          if (newPlayList.tracks?.length === 1) {
            set({ currentTrack: track });
          }
          set({ currentPlayList: newPlayList });
        } else {
          const filteredPlaylist = {
            ...newPlayList,
            tracks: newPlayList.tracks?.filter((currTrack) => currTrack.id !== track.id),
          };
          set({
            currentPlayList: filteredPlaylist,
          });
        }
      },
      toggleIsAddingPlaylist: (value) => {
        set({ isAddingPlaylist: value });
      },
      setPlayedSongs: (playedSongs) => {
        set({ playedSongs });
      },
    }),
    {
      name: 'track-store',
      partialize: (state) => ({
        playlists: state.playlists,
        currentTrack: state.currentTrack,
        currentPlayList: state.currentPlayList,
        isShuffleActive: state.isShuffleActive,
        isRepeatActive: state.isRepeatActive,
        playedSongs: state.playedSongs,
      }),
    },
  ),
);

export default useTrackStore;
