import React, { useState, useEffect } from 'react';
import type { Video } from '../types';
import { BackIcon } from './Icons';

interface VideoPlayerProps {
  video: Video;
  onBack: () => void;
  relatedVideos: Video[];
  onSelectRelated: (video: Video) => void;
}

const RelatedVideoCard: React.FC<{video: Video; onSelect: (video: Video) => void}> = ({ video, onSelect }) => (
    <div className="flex gap-2 cursor-pointer group" onClick={() => onSelect(video)}>
        <img src={video.thumbnailUrl} alt={video.title} className="w-40 aspect-video object-cover rounded-md flex-shrink-0" />
        <div>
            <h4 className="text-sm font-semibold leading-tight group-hover:text-red-400 transition-colors">{video.title}</h4>
            <p className="text-xs text-gray-400 mt-1">{video.channel}</p>
            <p className="text-xs text-gray-400">{video.views}</p>
        </div>
    </div>
);

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onBack, relatedVideos, onSelectRelated }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Reset description expansion when a new video is selected from the related list
  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [video.id]);

  const descriptionThreshold = 200;
  const isLongDescription = video.description.length > descriptionThreshold;

  return (
    <div className="max-w-7xl mx-auto">
      <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
        <BackIcon />
        Back to Results
      </button>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="aspect-video bg-black rounded-xl shadow-2xl overflow-hidden">
             <video key={video.id} controls autoPlay className="w-full h-full" poster={video.thumbnailUrl}>
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{video.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
              <span>{video.channel}</span>
              <span>&bull;</span>
              <span>{video.views}</span>
              <span>&bull;</span>
              <span>{video.uploadedAt}</span>
            </div>
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
              <div className={`relative overflow-hidden transition-all duration-300 ease-in-out ${isLongDescription && !isDescriptionExpanded ? 'max-h-24' : 'max-h-none'}`}>
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{video.description}</p>
                {isLongDescription && !isDescriptionExpanded && (
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-800/[.5] to-transparent pointer-events-none"></div>
                )}
              </div>
              {isLongDescription && (
                <button 
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)} 
                  className="font-semibold text-sm mt-2 text-gray-200 hover:text-white"
                >
                  {isDescriptionExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>
        </div>
        <aside className="lg:w-96 flex-shrink-0">
          <h3 className="text-xl font-semibold mb-4">Up Next</h3>
          <div className="space-y-4">
            {relatedVideos.slice(0, 10).map(relatedVideo => (
              <RelatedVideoCard key={relatedVideo.id} video={relatedVideo} onSelect={onSelectRelated} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};