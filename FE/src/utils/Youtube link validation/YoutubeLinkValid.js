export const YoutubeLinkValid=(youtubeUrl)=> {
    const regex = /^https:\/\/youtu\.be\/[a-zA-Z0-9_-]{11}(?:\?si=[a-zA-Z0-9_-]+)?$/;
  return regex.test(youtubeUrl);
  }