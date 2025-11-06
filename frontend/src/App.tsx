import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import StyleSelector from './components/StyleSelector';
import Preview from './components/Preview';
import Loader from './components/Loader';
import ErrorBanner from './components/ErrorBanner';
import { Wand2, Download, Sparkles } from 'lucide-react';
import { transformImage } from './services/api';
import './App.css';

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('Anime Style');
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transformationData, setTransformationData] = useState<any>(null);

  const handleImageUpload = (file: File) => {
    setImage(file);
    setTransformedImage(null);
    setTransformationData(null);
    setError(null);
  };

  const handleTransform = async () => {
    if (!image) {
      setError('Please upload an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await transformImage(image, selectedStyle);
      if (result.success) {
        setTransformedImage(`data:${result.mimeType};base64,${result.transformedImage}`);
        setTransformationData(result);
      } else {
        setError(result.message || 'Transformation failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during transformation');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!transformedImage) return;

    const link = document.createElement('a');
    link.href = transformedImage;
    link.download = `transformed-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75"></div>
              <h1 className="relative text-5xl md:text-6xl font-bold text-white bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Nano Banana
              </h1>
            </div>
            <Sparkles className="ml-3 text-yellow-400 animate-pulse" size={32} />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform your photos into stunning artistic styles with the power of AI
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-purple-300">
            <Wand2 size={20} />
            <span className="text-sm font-medium">Powered by Google Gemini AI</span>
          </div>
        </div>

        {/* Error Banner */}
        {error && <ErrorBanner message={error} onClose={() => setError(null)} />}

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Upload and Controls */}
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Sparkles className="mr-2 text-yellow-400" size={24} />
                Upload Your Image
              </h2>
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>

            {/* Style Selector */}
            {image && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl animate-fade-in">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Wand2 className="mr-2 text-purple-400" size={24} />
                  Choose Your Style
                </h2>
                <StyleSelector 
                  selectedStyle={selectedStyle} 
                  onStyleChange={setSelectedStyle} 
                />
                
                {/* Transform Button */}
                <div className="mt-6">
                  <button
                    onClick={handleTransform}
                    disabled={loading || !image}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Transforming...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 size={20} />
                        <span>Transform Image</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            {/* Preview Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Sparkles className="mr-2 text-yellow-400" size={24} />
                Preview
              </h2>
              
              {loading && (
                <div className="flex items-center justify-center py-20">
                  <Loader message="Creating your masterpiece..." />
                </div>
              )}
              
              {!loading && (
                <Preview 
                  originalImage={image}
                  transformedImage={transformedImage}
                  transformationData={transformationData}
                />
              )}
            </div>

            {/* Download Button */}
            {transformedImage && !loading && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl animate-fade-in">
                <button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Download size={20} />
                  <span>Download Transformed Image</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p className="text-sm">
            Powered by Google Gemini AI • Created with ❤️ for artistic expression
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
