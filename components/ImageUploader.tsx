import React, { useRef } from 'react';
import { PhotoIcon } from './icons/PhotoIcon';
import LoadingSpinner from './LoadingSpinner';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
  loadingMessage: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading, loadingMessage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      {isLoading ? (
        <LoadingSpinner message={loadingMessage} />
      ) : (
        <>
          <div 
            className="w-full max-w-2xl border-2 border-dashed border-dark-border rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-brand-primary hover:bg-dark-surface transition-all duration-300 group"
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <PhotoIcon className="h-20 w-20 text-dark-text-secondary/50 group-hover:text-brand-primary transition-colors" />
            <h2 className="mt-6 text-2xl font-semibold text-dark-text-primary">Upload a Photo to Begin the Magic</h2>
            <p className="mt-2 text-md text-dark-text-secondary">Drag & drop an image here, or click to select a file</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
              aria-label="File upload"
            />
            <button
                type="button"
                className="mt-6 px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg focus:ring-brand-primary transition-transform transform hover:scale-105"
            >
                Select Image
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
