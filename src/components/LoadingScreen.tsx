import React from 'react';

interface LoadingScreenProps {
  isLoading?: boolean;
  text?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isLoading = true, 
  text = "Loading" 
}) => {
  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="ring">
        {text}
        <span></span>
      </div>
    </div>
  );
};

export default LoadingScreen; 