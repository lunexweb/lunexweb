import { useState, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  priority?: boolean;
  quality?: number;
  width?: number;
  height?: number;
}

export const OptimizedVideo = ({
  src,
  poster,
  className = '',
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  preload = 'metadata',
  priority = false,
  quality = 80,
  width,
  height
}: OptimizedVideoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

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
        rootMargin: '100px' // Load videos slightly earlier than images
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Optimize Cloudinary video URLs
  const getOptimizedSrc = (originalSrc: string) => {
    if (!originalSrc.includes('cloudinary.com')) {
      return originalSrc;
    }

    // Extract the base URL and public ID
    const urlParts = originalSrc.split('/upload/');
    if (urlParts.length !== 2) return originalSrc;

    const baseUrl = urlParts[0] + '/upload';
    const publicId = urlParts[1];

    // Build optimization parameters for video
    const params = [];
    
    // Quality optimization
    params.push(`q_${quality}`);
    
    // Video format optimization
    params.push('f_auto:video');
    
    // Width optimization
    if (width) {
      params.push(`w_${width}`);
    } else {
      // Responsive video sizing
      params.push('w_auto');
    }
    
    // Height optimization
    if (height) {
      params.push(`h_${height}`);
    }
    
    // DPR optimization for high-DPI screens
    params.push('dpr_auto');
    
    // Video-specific optimizations
    params.push('c_fill,g_auto'); // Smart cropping
    params.push('fl_sanitize'); // Sanitize video for web delivery
    
    // Streaming optimization
    params.push('fl_streaming_attachment');

    return `${baseUrl}/${params.join(',')}/${publicId}`;
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    console.warn(`Failed to load video: ${src}`);
    setHasError(true);
    setIsLoaded(true);
  };

  const handleCanPlay = () => {
    // Start playing if autoplay is enabled
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(console.warn);
    }
  };

  return (
    <div 
      ref={observerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Loading Placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-900 flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-white text-sm opacity-75">Loading video...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-gray-900 flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-center text-white">
            <div className="text-4xl mb-2">🎬</div>
            <p className="text-sm opacity-75">Video unavailable</p>
          </div>
        </div>
      )}
      
      {/* Actual Video */}
      {isInView && !hasError && (
        <video
          ref={videoRef}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={priority ? 'auto' : preload}
          width={width}
          height={height}
          onLoadedData={handleLoadedData}
          onError={handleError}
          onCanPlay={handleCanPlay}
          style={{ width, height }}
        >
          <source src={getOptimizedSrc(src)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};
