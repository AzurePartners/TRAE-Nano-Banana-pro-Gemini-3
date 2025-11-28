import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface PreviewProps {
  originalImage: File | null;
  transformedImage: string | null;
  transformationData: any;
}

const Preview: React.FC<PreviewProps> = ({ originalImage, transformedImage, transformationData }) => {
  const originalImageUrl = originalImage ? URL.createObjectURL(originalImage) : null;

  if (!originalImage) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-gradient-to-r from-emerald-500 to-gray-600 p-4 rounded-full mb-4">
          <ImageIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Image Uploaded</h3>
        <p className="text-gray-600 text-sm">Upload an image in step 1 to see the transformation</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Original Image */}
      {originalImageUrl && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Original Image</h4>
          <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
            <img
              src={originalImageUrl}
              alt="Original"
              className="w-full h-auto object-contain max-h-96 mx-auto"
            />
          </div>
        </div>
      )}

      {/* Transformed Image */}
      {transformedImage && (
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Transformed Image</h4>
            {transformationData?.style && (
              <span className="text-xs bg-gradient-to-r from-emerald-500 to-gray-600 text-white px-3 py-1.5 rounded-full font-medium">
                {transformationData.style}
              </span>
            )}
          </div>
          <div className="rounded-lg overflow-hidden border-2 border-emerald-200 shadow-md bg-white">
            <img
              src={transformedImage}
              alt="Transformed"
              className="w-full h-auto object-contain max-h-96 mx-auto"
            />
          </div>
          {transformationData?.message && (
            <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-emerald-800 text-sm font-medium">{transformationData.message}</p>
            </div>
          )}
        </div>
      )}

      {/* Waiting for transformation */}
      {!transformedImage && originalImage && (
        <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
          <div className="bg-gradient-to-r from-emerald-500 to-gray-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 opacity-80">
            <ImageIcon className="w-8 h-8 text-white mx-auto" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Ready to Transform</h3>
          <p className="text-gray-600 text-sm">Click "Transform Image" in step 2 to apply your chosen style</p>
        </div>
      )}
    </div>
  );
};

export default Preview;