/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { PlaylistModel, TrackModel } from '@/models/tracks';

interface TrackStore {
  playLists: PlaylistModel[];
  openDeletePlayListModal: string | null;
  favorites: TrackModel[];
  currentTrack: TrackModel | null;
  currentPlayList: PlaylistModel;
  isShuffleActive: boolean;
  isRepeatActive: boolean;
  isPlaying: boolean;
  addPlayList: (playlist: PlaylistModel) => void;
  openRemovePlayListModal: (id: string) => void;
  closeRemovePlayListModal: () => void;
  removePlayList: (id: string) => void;
  setCurrentPlayList: (playList: PlaylistModel) => void;
  setCurrentTrack: (track: TrackModel) => void;
  setSingleTrack: (track: TrackModel) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  togglePlay: () => void;
  getCurrentMusicSiblings: () => { hasNext?: boolean; hasPrev?: boolean; index?: number };
  addOrRemoveToFavorites: (track: TrackModel) => void;
  setPlaying: (value: boolean) => void;
  addOrRemoveToQueue: (track: TrackModel) => void;
}

const useTrackStore = create<TrackStore>()(
  persist(
    (set, get) => ({
      isPlaying: false,
      playLists: [],
      openDeletePlayListModal: null,
      currentTrack: null,
      favorites: [],
      currentPlayList: {},
      isShuffleActive: false,
      isRepeatActive: false,
      addPlayList: (_playlist: PlaylistModel) => {},
      openRemovePlayListModal: (_id: string) => {},
      closeRemovePlayListModal: () => {},
      removePlayList: (_id: string) => {},
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
      addOrRemoveToFavorites: (track: TrackModel) => {
        const favorites = [...get().favorites];
        const index = favorites.findIndex((item) => item.id === track.id);
        if (index < 0) {
          set({ favorites: [...favorites, track] });
        } else {
          set({ favorites: favorites.filter((item) => item.id !== track.id) });
        }
      },
      addOrRemoveToQueue: (track: TrackModel) => {
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
    }),
    {
      name: 'track-store',
      partialize: (state) => ({
        playLists: state.playLists,
        currentTrack: state.currentTrack,
        currentPlayList: state.currentPlayList,
        isShuffleActive: state.isShuffleActive,
        isRepeatActive: state.isRepeatActive,
      }),
    },
  ),
);

export default useTrackStore;
