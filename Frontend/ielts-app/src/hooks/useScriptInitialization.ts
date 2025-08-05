import { useEffect } from 'react';

// Extend window interface for traditional scripts
declare global {
  interface Window {
    bootstrap?: any;
    $?: any;
    AOS?: any;
    Swiper?: any;
    initializeCustomScripts?: () => void;
  }
}

// Hook to initialize traditional JS scripts after React components mount
export const useScriptInitialization = () => {
  useEffect(() => {
    // Initialize scripts after component mounts
    const initializeScripts = () => {
      console.log('Initializing scripts...');

      // Initialize AOS (Animate On Scroll)
      if (window.AOS) {
        window.AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
        console.log('AOS initialized');
      }

      // Re-initialize Bootstrap components
      if (window.bootstrap) {
        // Initialize any new bootstrap components
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(tooltip => {
          new window.bootstrap.Tooltip(tooltip);
        });

        const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
        dropdowns.forEach(dropdown => {
          new window.bootstrap.Dropdown(dropdown);
        });
        
        console.log('Bootstrap components initialized');
      }

      // Initialize Swiper for banner carousel
      if (window.Swiper) {
        new window.Swiper('.swiper-slider-banner', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          effect: 'slide',
          speed: 800,
        });
        console.log('Swiper initialized');
      }

      // Initialize Slick sliders
      if (window.$ && window.$.fn.slick) {
        // Institutions slider
        window.$('.institutions-slider').not('.slick-initialized').slick({
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          arrows: false,
          dots: false,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              }
            }
          ]
        });

        // Top courses slider
        window.$('.top-courses-slider').not('.slick-initialized').slick({
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: false,
          dots: false,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              }
            }
          ]
        });

        // Featured course slider
        window.$('.feature-course-slider-2').not('.slick-initialized').slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          arrows: false,
          dots: false,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
        });

        // Featured instructor slider
        window.$('.featured-instructor-slider').not('.slick-initialized').slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2500,
          arrows: false,
          dots: false,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
        });

        // Testimonials slider
        window.$('.testimonials-slider').not('.slick-initialized').slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4500,
          arrows: false,
          dots: false,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
        });

        // Brand slide
        window.$('.brand-slide').not('.slick-initialized').slick({
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1000,
          arrows: false,
          dots: false,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
              }
            }
          ]
        });

        console.log('Slick sliders initialized');
      }

      // Initialize counter animations
      if (window.$ && window.$.fn.counterUp) {
        window.$('.count-digit').counterUp({
          delay: 10,
          time: 1000
        });
        console.log('Counter animations initialized');
      }

      // Initialize Fancybox for video modals
      if (window.$ && window.$.fn.fancybox) {
        window.$('[data-fancybox]').fancybox({
          youtube: {
            controls: 1,
            showinfo: 0
          },
          vimeo: {
            color: 'f00'
          }
        });
        console.log('Fancybox initialized');
      }

      // Trigger any custom script initializations
      if (window.initializeCustomScripts) {
        window.initializeCustomScripts();
      }

      console.log('All scripts initialized successfully');
    };

    // Small delay to ensure all scripts are loaded
    const timer = setTimeout(initializeScripts, 200);

    return () => clearTimeout(timer);
  }, []);
};

export default useScriptInitialization;
