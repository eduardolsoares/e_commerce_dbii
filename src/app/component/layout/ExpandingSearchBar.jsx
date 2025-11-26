import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useRef, useEffect } from 'react';

export default function ExpandingSearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <div className="flex items-center space-x-4 bg-white/0">

      <div
        className={`relative flex items-center rounded-full  transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-96 p-3 bg-gray-100 shadow-inner' : 'w-12 p-2'}
        `}
      >

        {!isExpanded && (
        <div className="flex lg:-ml-3 justify-content: absolute top ">
          <a href="#" className="p-6 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Search</span>
               <MagnifyingGlassIcon aria-hidden="true" className="size-6"
              onClick={!isExpanded ? toggleSearch : undefined} />
          </a>
        </div>
          )
        }

        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar na loja..."
          className={`
            w-full 
            h-full
            bg-transparent 
            border-none 
            focus:outline-none 
            ml-3 
            text-gray-900 
            placeholder-gray-500
            transition-opacity 
            duration-150
            // Controla a visibilidade e opacidade
            ${isExpanded ? 'visible opacity-100' : 'invisible opacity-0'}
          `}
          disabled={!isExpanded}
        />

        {isExpanded && (
          <XMarkIcon
            className="size-5 text-gray-500 cursor-pointer hover:text-gray-700 ml-2"
            onClick={handleClose}
          />
        )}
      </div>

    </div>
  );
}