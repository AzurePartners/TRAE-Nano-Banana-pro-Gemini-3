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
      icon: '🎌',
      gradient: 'from-pink-500 to-purple-600'
    },
    {
      name: 'Picasso Style',
      description: 'Geometric abstract cubist art',
      icon: '🎨',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Oil Painting Style',
      description: 'Classic Degas oil painting',
      icon: '🖼️',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      name: 'Frida Kahlo Style',
      description: 'Bold colors and symbolic elements',
      icon: '🌺',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      name: 'Miniature Effect',
      description: '1/7 scale commercialized figure',
      icon: '🏺',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  return (
    <div className="space-y-3">
      {styles.map((style) => (
        <div
          key={style.name}
          onClick={() => onStyleChange(style.name)}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
            selectedStyle === style.name
              ? `border-purple-400 bg-gradient-to-r ${style.gradient} shadow-lg shadow-purple-500/25`
              : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-purple-400/50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="text-2xl">{style.icon}</div>
            <div className="flex-1">
              <h3 className={`font-bold text-lg ${
                selectedStyle === style.name ? 'text-white' : 'text-gray-200'
              }`}>
                {style.name}
              </h3>
              <p className={`text-sm ${
                selectedStyle === style.name ? 'text-gray-100' : 'text-gray-400'
              }`}>
                {style.description}
              </p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${
              selectedStyle === style.name
                ? 'bg-purple-400 border-purple-400'
                : 'border-gray-400'
            }`}>
              {selectedStyle === style.name && (
                <div className="w-full h-full rounded-full bg-white transform scale-75"></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StyleSelector;