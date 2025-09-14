
import React, { useState, useCallback } from 'react';
import { EditHistoryItem, ImageFile } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import EditorPanel from './components/EditorPanel';
import { editImage, fileToBase64 } from './services/geminiService';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editHistory, setEditHistory] = useState<EditHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('Applying AI magic...');

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      setIsLoading(true);
      setLoadingMessage('Preparing your image...');
      const base64 = await fileToBase64(file);
      const imageFile = {
        file,
        base64,
        mimeType: file.type,
      };
      setOriginalImage(imageFile);
      setEditHistory([{ imageUrl: base64, prompt: 'Original Image' }]);
      setError(null);
    } catch (e) {
      setError('Failed to load image. Please try another file.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEdit = useCallback(async (prompt: string) => {
    if (!editHistory.length || isLoading) return;

    setIsLoading(true);
    setError(null);
    setLoadingMessage('Generating your edit...');

    const currentImage = editHistory[editHistory.length - 1];

    try {
      const newImageBase64 = await editImage(currentImage.imageUrl, originalImage?.mimeType || 'image/png', prompt);
      if (newImageBase64) {
        setEditHistory(prev => [...prev, { imageUrl: `data:${originalImage?.mimeType};base64,${newImageBase64}`, prompt }]);
      } else {
        throw new Error('The AI did not return an image. Please try a different prompt.');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Editing failed: ${errorMessage}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [editHistory, isLoading, originalImage]);

  const handleReset = () => {
    setOriginalImage(null);
    setEditHistory([]);
    setError(null);
  };
  
  const handleHistorySelect = (index: number) => {
    setEditHistory(prev => prev.slice(0, index + 1));
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text-primary font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} loadingMessage={loadingMessage} />
        ) : (
          <EditorPanel
            history={editHistory}
            onEdit={handleEdit}
            onReset={handleReset}
            onHistorySelect={handleHistorySelect}
            isLoading={isLoading}
            loadingMessage={loadingMessage}
            error={error}
          />
        )}

        <footer className="text-center mt-12 text-dark-text-secondary/50">
          <p>Powered by Gemini API</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
