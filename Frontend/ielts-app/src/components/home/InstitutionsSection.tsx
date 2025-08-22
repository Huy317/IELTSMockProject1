import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function InstitutionsSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        }
      },
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
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };
  return (
    <section className="client-section">
      <div className="container">
        <h6 className="fw-medium text-center mb-4">
          Trusted by <span className="text-decoration-underline text-secondary">20+</span> Institutions Around the World
        </h6>

        <Slider {...settings} className="institutions-slider">
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/01.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/02.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/03.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/04.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/05.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/06.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/07.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/02.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/03.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/04.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/05.svg" alt="img" />
          </div>
          <div className="institutions-items p-1">
            <img className="img-fluid" src="/assets/img/client/06.svg" alt="img" />
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default InstitutionsSection;
