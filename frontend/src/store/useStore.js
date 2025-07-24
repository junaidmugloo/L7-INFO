import { create } from 'zustand';

const useStore = create((set) => ({
  genres: [],
  actors: [],
  directors: [],
  setGenres: (data) => set({ genres: data }),
  setActors: (data) => set({ actors: data }),
  setDirectors: (data) => set({ directors: data }),
}));

export default useStore;
