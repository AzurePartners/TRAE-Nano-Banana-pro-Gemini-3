import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import StyleSelector from './components/StyleSelector';
import Preview from './components/Preview';
import Loader from './components/Loader';
import ErrorBanner from './components/ErrorBanner';
import { Wand2, Download, Edit3 } from 'lucide-react';
import { transformImage } from './services/api';
import './App.css';

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('Anime Style');
  const [useCustomPrompt, setUseCustomPrompt] = useState<boolean>(false);
  const [customPrompt, setCustomPrompt] = useState<string>('');
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

  const handleToggleCustomPrompt = (enabled: boolean) => {
    setUseCustomPrompt(enabled);
    if (!enabled) {
      setCustomPrompt('');
    }
    setTransformedImage(null);
    setTransformationData(null);
    setError(null);
  };

  const handleTransform = async () => {
    if (!image) {
      setError('Please upload an image first');
      return;
    }

    if (useCustomPrompt && !customPrompt.trim()) {
      setError('Please enter a custom prompt');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await transformImage(
        image, 
        selectedStyle, 
        customPrompt, 
        useCustomPrompt
      );
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
    <div className="min-h-screen h-full w-full bg-gradient-to-br from-emerald-50 via-green-50 to-gray-100 relative">
      {/* Subtle background elements - fixed to viewport */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full min-h-screen">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-20">
          <div className="w-full px-6 sm:px-8 lg:px-12 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-emerald-500 to-gray-600 p-2.5 rounded-lg">
                  <Wand2 className="text-white" size={22} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-gray-700 bg-clip-text text-transparent">
                    Nano Banana
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">AI Image Editor</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">Gemini 3.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && <ErrorBanner message={error} onClose={() => setError(null)} />}

        {/* Main Content */}
        <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Transform Your Photos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create stunning artistic styles with the power of AI
            </p>
          </div>

          {/* Main Workflow */}
          <div className="space-y-8">
            {/* Step 1: Upload */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="bg-gradient-to-r from-emerald-500 to-gray-600 text-white text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                  <h3 className="text-xl font-bold text-gray-900">Upload Your Image</h3>
                </div>
                <p className="text-sm text-gray-500 ml-11">Select an image to begin transformation</p>
              </div>
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>

            {/* Step 2: Transformation Options */}
            {image && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 animate-fade-in">
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="bg-gradient-to-r from-emerald-500 to-gray-600 text-white text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                    <h3 className="text-xl font-bold text-gray-900">Choose Transformation Style</h3>
                  </div>
                  <p className="text-sm text-gray-500 ml-11">Select a predefined style or create your own custom prompt</p>
                </div>
                
                {/* Toggle between predefined and custom prompts */}
                <div className="mb-8">
                  <div className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-emerald-50/30 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Edit3 className="text-emerald-600" size={20} />
                      <div>
                        <label className="text-gray-900 font-semibold cursor-pointer block" onClick={() => handleToggleCustomPrompt(!useCustomPrompt)}>
                          Custom Prompt Mode
                        </label>
                        <p className="text-sm text-gray-600">Write your own transformation instructions</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleCustomPrompt(!useCustomPrompt)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        useCustomPrompt ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                          useCustomPrompt ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Style Selector - shown when custom prompt is disabled */}
                {!useCustomPrompt && (
                  <div className="mb-8">
                    <StyleSelector 
                      selectedStyle={selectedStyle} 
                      onStyleChange={setSelectedStyle} 
                    />
                  </div>
                )}

                {/* Custom Prompt Input - shown when custom prompt is enabled */}
                {useCustomPrompt && (
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Enter Your Custom Prompt
                    </label>
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="Describe how you want to transform the image. Be specific about style, colors, mood, or artistic direction..."
                      className="w-full h-36 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Example: "Transform this portrait into a cyberpunk style with neon lights and futuristic elements"
                    </p>
                  </div>
                )}
                
                {/* Transform Button */}
                <button
                  onClick={handleTransform}
                  disabled={loading || !image || (useCustomPrompt && !customPrompt.trim())}
                  className="w-full bg-gradient-to-r from-emerald-500 to-gray-600 hover:from-emerald-600 hover:to-gray-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.01] disabled:hover:scale-100 shadow-md hover:shadow-lg flex items-center justify-center space-x-3 disabled:cursor-not-allowed text-base"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Processing Transformation...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 size={20} />
                      <span>Transform Image</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Step 3: Preview and Download */}
            {(image || transformedImage) && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="bg-gradient-to-r from-emerald-500 to-gray-600 text-white text-sm font-semibold rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                    <h3 className="text-xl font-bold text-gray-900">Preview & Download</h3>
                  </div>
                  <p className="text-sm text-gray-500 ml-11">View your transformed image and download the result</p>
                </div>
                
                {loading && (
                  <div className="flex items-center justify-center py-20">
                    <Loader message="Creating your masterpiece..." />
                  </div>
                )}
                
                {!loading && (
                  <div className="space-y-6">
                    <Preview 
                      originalImage={image}
                      transformedImage={transformedImage}
                      transformationData={transformationData}
                    />
                    
                    {transformedImage && (
                      <button
                        onClick={handleDownload}
                        className="w-full bg-gradient-to-r from-emerald-500 to-gray-600 hover:from-emerald-600 hover:to-gray-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.01] shadow-md hover:shadow-lg flex items-center justify-center space-x-3 text-base"
                      >
                        <Download size={20} />
                        <span>Download Transformed Image</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pb-12 text-center">
          <p className="text-sm text-gray-500">
            Powered by Google Gemini AI • Created for artistic expression
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
