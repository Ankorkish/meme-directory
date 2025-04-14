import Cookies from 'js-cookie';
import { initialMemes } from "./memeData";

const STORAGE_KEY = "meme_directory_data";

export const loadMemes = () => {
  const storedData = Cookies.get(STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error('Error parsing stored memes', e);
      return initialMemes;
    }
  }
  return initialMemes;
};

export const saveMemes = (memes) => {
  Cookies.set(STORAGE_KEY, JSON.stringify(memes), { expires: 30 });
};

export const updateMeme = (updatedMeme) => {
  const memes = loadMemes();
  const updatedMemes = memes.map(meme =>
    meme.id === updatedMeme.id ? updatedMeme : meme
  );

  saveMemes(updatedMemes);
  return updatedMemes;
};