// utils/fetchYouTubeVideo.js
const apiKey ="AIzaSyAEu_RvHypE0ZhNp8Oqr-LuLgsFo1Dpnww";
const videoId= "uAzYOs5357A";
export async function fetchYouTubeVideo() {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      return {
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.high.url,
      };
    } else {
      throw new Error("Video not found");
    }
  }