
import React from 'react';
import type { Video } from '../types';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos, onSelectVideo }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onSelectVideo={onSelectVideo} />
      ))}
    </div>
  );
};
