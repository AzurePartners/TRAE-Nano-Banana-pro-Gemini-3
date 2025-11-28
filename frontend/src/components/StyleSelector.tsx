import React from 'react';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  const styles = [
    {
      name: 'Anime Style',
      description: 'Transform into beautiful anime character',
      gradient: 'from-pink-500 to-purple-600'
    },
    {
      name: 'Picasso Style',
      description: 'Geometric abstract cubist art',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Oil Painting Style',
      description: 'Classic Degas oil painting',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      name: 'Frida Kahlo Style',
      description: 'Bold colors and symbolic elements',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      name: 'Miniature Effect',
      description: '1/7 scale commercialized figure',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {styles.map((style) => (
        <div
          key={style.name}
          onClick={() => onStyleChange(style.name)}
          className={`p-5 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
            selectedStyle === style.name
              ? `border-emerald-500 bg-gradient-to-r from-emerald-500 to-gray-600 shadow-md ring-2 ring-emerald-200`
              : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-emerald-300 hover:shadow-sm'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-semibold text-base mb-1 ${
                selectedStyle === style.name ? 'text-white' : 'text-gray-900'
              }`}>
                {style.name}
              </h3>
              <p className={`text-sm leading-relaxed ${
                selectedStyle === style.name ? 'text-gray-100' : 'text-gray-600'
              }`}>
                {style.description}
              </p>
            </div>
            <div className={`ml-4 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              selectedStyle === style.name
                ? 'bg-white border-white'
                : 'border-gray-300 bg-white'
            }`}>
              {selectedStyle === style.name && (
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StyleSelector;