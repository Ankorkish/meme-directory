"use client"

import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export const useMemes = () => {
  const [memes, setMemes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getDefaultMemes = () => {
    const imageLinks = [
      "https://i.ibb.co/C3ryJcHr/Screenshot-2025-04-14-162042.jpg",
      "https://i.ibb.co/F4XggJFk/Screenshot-2025-04-14-162727.jpg",
      "https://i.ibb.co/HpM7nW36/Screenshot-2025-04-14-162549.jpg",
      "https://i.ibb.co/8nSHqCXV/Screenshot-2025-04-14-162614.jpg",
      "https://i.ibb.co/Q38x9Kjx/Screenshot-2025-04-14-162713.jpg",
      "https://i.ibb.co/SwjgjPjY/Screenshot-2025-04-14-162843.jpg",
      "https://i.ibb.co/Hfnqq50Y/Screenshot-2025-04-14-163029.jpg",
      "https://i.ibb.co/5XbCdhZz/Screenshot-2025-04-14-162852.jpg",
      "https://i.ibb.co/nsDBX5hW/49aff0d6e32092b812a500d06b0bc6ea.jpg",
      "https://i.ibb.co/Dg9xYjJ4/Screenshot-2025-04-14-162913.jpg"
    ];

    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Meme ${i + 1}`,
      imgLink: imageLinks[i],
      likes: (i + 1) * 5
    }));
  };

  useEffect(() => {
    const defaultMemes = getDefaultMemes();

    try {
      const savedMemes = Cookies.get('memes');
      if (savedMemes) {
        const parsedMemes = JSON.parse(savedMemes);
        if (Array.isArray(parsedMemes) && parsedMemes.length === 10) {
          setMemes(parsedMemes);
        } else {
          setMemes(defaultMemes);
          Cookies.set('memes', JSON.stringify(defaultMemes), { expires: 30 });
        }
      } else {
        setMemes(defaultMemes);
        Cookies.set('memes', JSON.stringify(defaultMemes), { expires: 30 });
      }
    } catch (error) {
      console.error('Error parsing memes from cookies:', error);
      setMemes(defaultMemes);
      Cookies.set('memes', JSON.stringify(defaultMemes), { expires: 30 });
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && memes.length === 10) {
      Cookies.set('memes', JSON.stringify(memes), { expires: 30 }); // Expires in 30 days
    }
  }, [memes, isLoaded]);

  const validateUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

    if (!urlPattern.test(url)) {
      return "Please enter a valid URL";
    }

    if (!url.toLowerCase().endsWith('.jpg')) {
      return "URL must point to a JPG image";
    }

    return "";
  };

  const validateLikes = (likes) => {
    if (likes < 0) {
      return "Likes cannot be negative";
    }

    if (likes > 99) {
      return "Maximum likes value is 99";
    }

    return "";
  };

  const updateMeme = (updatedMeme) => {
    const urlError = validateUrl(updatedMeme.imgLink);
    const likesError = validateLikes(updatedMeme.likes);

    if (urlError || likesError) {
      return { success: false, urlError, likesError };
    }

    const updatedMemes = memes.map(meme =>
      meme.id === updatedMeme.id ? updatedMeme : meme
    );

    setMemes(updatedMemes);
    return { success: true };
  };

  return {
    memes,
    isLoaded,
    validateUrl,
    validateLikes,
    updateMeme
  };
};