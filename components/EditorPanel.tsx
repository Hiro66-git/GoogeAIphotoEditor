import React, { useState } from 'react';
import { EditHistoryItem } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { SparklesIcon } from './icons/SparklesIcon';
import PromptSuggestions from './PromptSuggestions';
import { DownloadIcon } from './icons/DownloadIcon';

interface EditorPanelProps {
  history: EditHistoryItem[];
  onEdit: (prompt: string) => void;
  onReset: () => void;
  onHistorySelect: (index: number) => void;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  history,
  onEdit,
  onReset,
  onHistorySelect,
  isLoading,
  loadingMessage,
  error,
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const currentImage = history[history.length - 1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onEdit(prompt);
      setPrompt('');
    }
  };
  
  const handleDownload = () => {
    if (!currentImage) return;
    const link = document.createElement('a');
    link.href = currentImage.imageUrl;
    const mimeType = currentImage.imageUrl.split(';')[0].split(':')[1] || 'image/png';
    const extension = mimeType.split('/')[1] || 'png';
    link.download = `ai-edit-${Date.now()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* Left Panel: History */}
      <div className="xl:col-span-3 order-2 xl:order-1 bg-dark-surface p-6 rounded-xl shadow-lg border border-dark-border">
          <h2 className="text-xl font-bold text-dark-text-primary mb-4">History</h2>
          <div className="max-h-96 xl:max-h-[calc(100vh-20rem)] overflow-y-auto pr-2 space-y-3">
              {history.map((item, index) => (
                  <div 
                      key={index} 
                      onClick={() => !isLoading && onHistorySelect(index)}
                      className={`flex items-center gap-4 p-2 rounded-lg transition-colors ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'} ${history.length - 1 === index ? 'bg-brand-primary/30' : 'hover:bg-dark-border/50'}`}
                      aria-current={history.length - 1 === index}
                  >
                      <img src={item.imageUrl} alt={`Edit ${index}: ${item.prompt}`} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                      <p className="text-sm text-dark-text-secondary truncate">{item.prompt}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* Center Panel: Image Display */}
      <div className="xl:col-span-6 order-1 xl:order-2">
        <div className="bg-dark-surface p-4 rounded-xl shadow-lg border border-dark-border flex items-center justify-center aspect-square sticky top-20">
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg z-10">
                <LoadingSpinner message={loadingMessage} />
              </div>
            )}
            <img
              src={currentImage.imageUrl}
              alt={currentImage.prompt}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
            <button 
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-dark-surface text-dark-text-primary font-semibold rounded-lg shadow-md border border-dark-border hover:bg-dark-border/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-brand-primary transition-all duration-200"
            >
                <DownloadIcon className="h-5 w-5" />
                Download Image
            </button>
        </div>
      </div>

       {/* Right Panel: Controls */}
       <div className="xl:col-span-3 order-3 xl:order-3 flex flex-col gap-8">
        <div className="bg-dark-surface p-6 rounded-xl shadow-lg border border-dark-border">
          <h2 className="text-xl font-bold mb-4 text-dark-text-primary">Edit Image</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Add a wizard hat to the cat'"
              className="w-full h-28 p-3 bg-dark-bg border border-dark-border rounded-lg text-dark-text-secondary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition resize-none"
              disabled={isLoading}
              aria-label="Image editing prompt"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-primary/90 disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-brand-primary transition-all duration-200 transform hover:scale-105"
            >
              <SparklesIcon className="h-5 w-5" />
              {isLoading ? 'Generating...' : 'Generate Edit'}
            </button>
          </form>
          {error && <p className="mt-4 text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</p>}
           <div className="mt-6">
             <PromptSuggestions onSelect={setPrompt} />
           </div>
        </div>
        <div className="bg-dark-surface p-6 rounded-xl shadow-lg border border-dark-border">
            <h2 className="text-xl font-bold text-dark-text-primary mb-4">Actions</h2>
            <button onClick={onReset} className="w-full text-center px-4 py-3 bg-red-600/20 text-red-300 font-semibold rounded-lg hover:bg-red-600/40 transition">
                Start Over
            </button>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
