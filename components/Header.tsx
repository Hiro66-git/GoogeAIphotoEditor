
import React from 'react';
import { PhotoIcon } from './icons/PhotoIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-surface/80 backdrop-blur-sm border-b border-dark-border sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <PhotoIcon className="h-8 w-8 text-brand-primary" />
            <h1 className="text-2xl font-bold text-dark-text-primary tracking-tight">
              AI Photo Editor
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
