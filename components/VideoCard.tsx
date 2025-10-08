
import React from 'react';
import type { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onSelectVideo: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onSelectVideo }) => {
  return (
    <div 
      className="flex flex-col cursor-pointer group transform hover:-translate-y-1 transition-transform duration-300"
      onClick={() => onSelectVideo(video)}
    >
      <div className="relative mb-2">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full aspect-video object-cover rounded-lg shadow-lg group-hover:shadow-red-500/20 transition-shadow duration-300" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-100 leading-snug group-hover:text-red-400 transition-colors duration-300">{video.title}</h3>
        <p className="text-xs text-gray-400 mt-1">{video.channel}</p>
        <p className="text-xs text-gray-400">{video.views} &bull; {video.uploadedAt}</p>
      </div>
    </div>
  );
};
