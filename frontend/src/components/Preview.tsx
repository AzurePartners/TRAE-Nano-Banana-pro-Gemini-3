import React from 'react';
import { Sparkles } from 'lucide-react';

interface PreviewProps {
  originalImage: File | null;
  transformedImage: string | null;
  transformationData: any;
}

const Preview: React.FC<PreviewProps> = ({ originalImage, transformedImage, transformationData }) => {
  const originalImageUrl = originalImage ? URL.createObjectURL(originalImage) : null;

  if (!originalImage) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full mb-4">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Ready to Transform</h3>
        <p className="text-gray-400">Upload an image to see the magic happen</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Transformed Image */}
      {transformedImage && (
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 animate-fade-in">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <Sparkles className="mr-2 text-yellow-400" size={20} />
            Transformed Image
            {transformationData?.style && (
              <span className="ml-2 text-sm bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-full">
                {transformationData.style}
              </span>
            )}
          </h3>
          <div className="rounded-lg overflow-hidden border border-white/20 shadow-lg">
            <img
              src={transformedImage}
              alt="Transformed"
              className="w-full h-auto object-contain"
            />
          </div>
          {transformationData?.message && (
            <div className="mt-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
              <p className="text-green-300 text-sm">{transformationData.message}</p>
            </div>
          )}
        </div>
      )}

      {/* Waiting for transformation */}
      {!transformedImage && originalImage && (
        <div className="bg-white/5 rounded-xl p-6 text-center border border-white/10">
          <div className="animate-pulse">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 opacity-50">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ready for Magic</h3>
            <p className="text-gray-400">Click "Transform Image" to apply your chosen style</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;