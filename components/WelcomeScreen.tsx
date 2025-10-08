
import React from 'react';
import { FilmIcon } from './Icons';

interface WelcomeScreenProps {
  onSearch: (query: string) => void;
}

const sampleQueries = [
  "Space documentaries",
  "80s synthwave music",
  "How to cook paella",
  "DIY woodworking projects",
  "Cute cat videos",
  "Learn React in 30 minutes"
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSearch }) => {
  return (
    <div className="text-center mt-10 md:mt-20 flex flex-col items-center">
      <FilmIcon />
      <h2 className="text-4xl font-bold mt-6 text-gray-100">Welcome to OmniTube</h2>
      <p className="text-lg text-gray-400 mt-2 max-w-xl">
        Your personal video universe awaits. Search for anything to begin, and our AI will curate a list of videos for you to watch.
      </p>
      <div className="mt-8">
        <h3 className="text-md font-semibold text-gray-300 mb-4">Try searching for:</h3>
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
          {sampleQueries.map(query => (
            <button 
              key={query} 
              onClick={() => onSearch(query)}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              {query}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
