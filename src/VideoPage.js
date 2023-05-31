import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function VideoPage() {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const api_key = "AIzaSyDBmL5qbTIZhijDBSrsQKSlhJmGvfUN_JI";
        const video_http = "https://www.googleapis.com/youtube/v3/videos?";
        const channel_http = "https://www.googleapis.com/youtube/v3/channels?";

        const videoResponse = await fetch(video_http + new URLSearchParams({
          key: api_key,
          part: 'snippet',
          id: videoId
        }));
        const videoData = await videoResponse.json();

        const channelResponse = await fetch(channel_http + new URLSearchParams({
          key: api_key,
          part: 'snippet',
          id: videoData.items[0].snippet.channelId
        }));
        const channelData = await channelResponse.json();

        const videoItem = {
          id: videoData.items[0].id,
          snippet: videoData.items[0].snippet,
          channelThumbnail: channelData.items[0].snippet.thumbnails.default.url
        };

        setVideoData(videoItem);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideoData();
  }, [videoId]);

  return (
    <div>
      {videoData ? (
        <>
          <h1>{videoData.snippet.title}</h1>
          <p>{videoData.snippet.description}</p>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoData.id}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Video Player"
          ></iframe>
        </>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}


