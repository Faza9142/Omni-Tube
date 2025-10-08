
import React, { useState, useCallback } from 'react';
import type { Video } from './types';
import { generateVideoResults } from './services/geminiService';
import { SearchBar } from './components/SearchBar';
import { VideoGrid } from './components/VideoGrid';
import { VideoPlayer } from './components/VideoPlayer';
import { LogoIcon } from './components/Icons';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    if (!query) return;
    setIsLoading(true);
    setError(null);
    setSelectedVideo(null);
    try {
      const results = await generateVideoResults(query);
      setVideos(results);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch video suggestions. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleBackToGrid = () => {
    setSelectedVideo(null);
  };

  const renderContent = () => {
    if (selectedVideo) {
      return <VideoPlayer video={selectedVideo} onBack={handleBackToGrid} relatedVideos={videos.filter(v => v.id !== selectedVideo.id)} onSelectRelated={handleSelectVideo} />;
    }
    if (isLoading) {
      return <div className="flex justify-center items-center mt-20"><LoadingSpinner /></div>;
    }
    if (error) {
      return <div className="text-center mt-20 text-red-400 bg-red-900/20 p-6 rounded-lg max-w-md mx-auto">{error}</div>;
    }
    if (videos.length > 0) {
      return <VideoGrid videos={videos} onSelectVideo={handleSelectVideo} />;
    }
    return <WelcomeScreen onSearch={handleSearch} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md p-4 shadow-lg shadow-black/20">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedVideo(null); setVideos([])}}>
            <LogoIcon />
            <h1 className="text-2xl font-bold tracking-tighter text-red-500">OmniTube</h1>
          </div>
          <div className="w-full max-w-2xl">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
