/**
 * Lazy loading implementation for images
 */

interface LazyLoadOptions {
  selector?: string;
  rootMargin?: string;
  threshold?: number;
}

class LazyLoader {
  private images: HTMLImageElement[];
  private observer: IntersectionObserver | null = null;
  private readonly options: LazyLoadOptions;

  constructor(options: LazyLoadOptions = {}) {
    this.options = {
      selector: 'img.lazy',
      rootMargin: '50px',
      threshold: 0.01,
      ...options,
    };
    this.images = [];
    this.init();
  }

  /**
   * Initialize the lazy loader
   */
  private init(): void {
    this.images = Array.from(
      document.querySelectorAll<HTMLImageElement>(this.options.selector!)
    );

    if ('IntersectionObserver' in window) {
      this.initIntersectionObserver();
    } else {
      // Fallback for browsers without IntersectionObserver
      this.initScrollListener();
    }
  }

  /**
   * Modern approach using Intersection Observer API
   */
  private initIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            this.loadImage(img);
            this.observer?.unobserve(img);
          }
        });
      },
      {
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold,
      }
    );

    this.images.forEach((img) => {
      this.observer?.observe(img);
    });
  }

  /**
   * Fallback scroll listener for older browsers
   */
  private initScrollListener(): void {
    const processScroll = (): void => {
      this.images = this.images.filter((img) => {
        if (this.isElementInViewport(img)) {
          this.loadImage(img);
          return false; // Remove from array
        }
        return true; // Keep in array
      });

      // Remove listener if all images are loaded
      if (this.images.length === 0) {
        window.removeEventListener('scroll', processScroll);
        window.removeEventListener('resize', processScroll);
      }
    };

    processScroll(); // Initial check
    window.addEventListener('scroll', processScroll, { passive: true });
    window.addEventListener('resize', processScroll, { passive: true });
  }

  /**
   * Load an image
   */
  private loadImage(el: HTMLImageElement): void {
    const src = el.getAttribute('data-src');
    
    if (!src) {
      console.warn('No data-src attribute found on image:', el);
      return;
    }

    const img = new Image();
    
    img.onload = (): void => {
      el.src = src;
      el.classList.remove('lazy');
      el.classList.add('lazy-loaded');
      
      // Dispatch custom event
      el.dispatchEvent(
        new CustomEvent('lazyloaded', {
          detail: { src },
        })
      );
    };

    img.onerror = (): void => {
      console.error('Failed to load image:', src);
      el.classList.add('lazy-error');
    };

    img.src = src;
  }

  /**
   * Check if element is in viewport (fallback method)
   */
  private isElementInViewport(el: HTMLImageElement): boolean {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= windowHeight &&
      rect.right <= windowWidth
    );
  }

  /**
   * Manually trigger loading of all remaining images
   */
  public loadAll(): void {
    this.images.forEach((img) => {
      this.loadImage(img);
      this.observer?.unobserve(img);
    });
    this.images = [];
  }

  /**
   * Destroy the lazy loader and clean up
   */
  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.images = [];
  }
}

// Initialize with default options
const lazyLoader = new LazyLoader();

// Export for use as module
export default LazyLoader;

// Also attach to window for non-module usage
declare global {
  interface Window {
    LazyLoader: typeof LazyLoader;
  }
}

if (typeof window !== 'undefined') {
  window.LazyLoader = LazyLoader;
}
