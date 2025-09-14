import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void;
}

const suggestions = [
  'Make this a watercolor painting',
  'Add a dramatic, cloudy sky',
  'Change the season to winter',
  'Give it a cyberpunk neon glow',
  'Turn it into a charcoal sketch',
  'Apply a vintage, faded photo effect',
  'Make it look like a still from a Wes Anderson film',
  'Add a lens flare to the image',
];

const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelect }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-dark-text-secondary mb-3 flex items-center gap-2">
        <SparklesIcon className="h-4 w-4 text-brand-secondary" />
        Inspiration
      </h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            className="px-3 py-1.5 text-xs bg-dark-border/50 text-dark-text-secondary rounded-full hover:bg-dark-border hover:text-dark-text-primary transition-all duration-200"
            aria-label={`Use prompt: ${prompt}`}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;
