// LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-100"></div>
            <h1 className='text-2xl px-2  '>LOaDinG</h1>
        </div>
    );
};

export default LoadingSpinner;
