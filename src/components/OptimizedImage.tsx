import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
  quality = 80,
  format = 'auto',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Optimize Cloudinary URLs
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc.includes('cloudinary.com')) {
      return originalSrc;
    }

    // Extract the base URL and public ID
    const urlParts = originalSrc.split('/upload/');
    if (urlParts.length !== 2) return originalSrc;

    const baseUrl = urlParts[0] + '/upload';
    const publicId = urlParts[1];

    // Build optimization parameters
    const params = [];
    
    // Quality
    params.push(`q_${quality}`);
    
    // Format
    if (format === 'auto') {
      params.push('f_auto');
    } else {
      params.push(`f_${format}`);
    }
    
    // Width optimization
    if (width) {
      params.push(`w_${width}`);
    } else {
      // Responsive widths for different breakpoints
      params.push('w_auto');
    }
    
    // Height optimization
    if (height) {
      params.push(`h_${height}`);
    }
    
    // DPR optimization for high-DPI screens
    params.push('dpr_auto');
    
    // Progressive loading
    params.push('fl_progressive');
    
    // Strip metadata to reduce file size
    params.push('fl_strip_profile');
    
    // Smart cropping for better composition
    params.push('c_fill,g_auto');

    return `${baseUrl}/${params.join(',')}/${publicId}`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setIsLoaded(true); // Still set as loaded to hide placeholder
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <img 
            src={placeholder} 
            alt="" 
            className="w-8 h-8 opacity-50"
            aria-hidden="true"
          />
        </div>
      )}
      
      {/* Actual Image */}
      {isInView && (
        <img
          src={getOptimizedSrc(src)}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading={priority ? 'eager' : loading}
          width={width}
          height={height}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          style={{ width, height }}
        />
      )}
    </div>
  );
};
