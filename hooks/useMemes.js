"use client"

import { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export const useMemes = () => {
  // Initialize with empty state first to avoid hydration errors
  const [memes, setMemes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create default memes with fixed values (no random)
  const getDefaultMemes = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Meme ${i + 1}`,
      imgLink: `https://fileinfo.com/img/ss/xl/jpg_44-2.jpg`,
      likes: (i + 1) * 5 // Predictable likes values: 5, 10, 15, etc.
    }));
  };

  // Load memes from cookies on component mount
  useEffect(() => {
    // Only run this on the client side
    const defaultMemes = getDefaultMemes();

    try {
      const savedMemes = Cookies.get('memes');
      if (savedMemes) {
        const parsedMemes = JSON.parse(savedMemes);
        if (Array.isArray(parsedMemes) && parsedMemes.length === 10) {
          setMemes(parsedMemes);
        } else {
          // If not exactly 10 memes, use default but save to cookies
          setMemes(defaultMemes);
          Cookies.set('memes', JSON.stringify(defaultMemes), { expires: 30 });
        }
      } else {
        // If no cookie exists, save the default memes
        setMemes(defaultMemes);
        Cookies.set('memes', JSON.stringify(defaultMemes), { expires: 30 });
      }
    } catch (error) {
      console.error('Error parsing memes from cookies:', error);
      // On error, reset to defaults and save
      setMemes(defaultMemes);
      Cookies.set('memes', JSON.stringify(defaultMemes), { expires: 30 });
    }

    setIsLoaded(true);
  }, []);

  // Save memes to cookies whenever memes state changes
  useEffect(() => {
    if (isLoaded && memes.length === 10) {
      Cookies.set('memes', JSON.stringify(memes), { expires: 30 }); // Expires in 30 days
    }
  }, [memes, isLoaded]);

  // Validation functions
  const validateUrl = (url) => {
    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

    // Check if it's a valid URL
    if (!urlPattern.test(url)) {
      return "Please enter a valid URL";
    }

    // Check if it ends with .jpg
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

  // Update meme function
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