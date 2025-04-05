import React from 'react';
import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-8 w-8 text-blue-600 animate-spin" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;