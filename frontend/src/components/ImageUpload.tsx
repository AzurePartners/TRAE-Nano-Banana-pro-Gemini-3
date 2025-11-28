import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageUpload(null as any);
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragOver
              ? 'border-emerald-400 bg-emerald-50 scale-[1.02]'
              : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gradient-to-r from-emerald-500 to-gray-600 p-4 rounded-full">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-gray-800 text-lg font-semibold mb-2">
                Drop your image here
              </p>
              <p className="text-gray-500 text-sm">
                or click to browse
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="bg-gradient-to-r from-emerald-500 to-gray-600 hover:from-emerald-600 hover:to-gray-700 text-white font-semibold py-2.5 px-6 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Choose Image
            </label>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50">
            <img
              src={preview}
              alt="Uploaded preview"
              className="w-full h-auto object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center space-x-2 text-white text-sm">
                  <ImageIcon size={16} />
                  <span>Image uploaded</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 transform hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export { ImageUpload };
