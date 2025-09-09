"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Image from "next/image";

const slides = [
  {
    title: "HSC - 27 ব্যাচ - অদম্য",
    image:
      "https://imgs.search.brave.com/jyyicBc6RCW2amTX4kHjNktWg7s0CPKzmVI5GE75ANg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbGwu/aGFydmFyZC5lZHUv/c2l0ZXMvZGVmYXVs/dC9maWxlcy9zdHls/ZXMvMTZfOV9tZWRp/dW0vcHVibGljL2Nv/dXJzZS9IS1NfUExD/X1NvY2lhbF9jb3Vy/c2VfT2N0MjBfMTIw/MHg2MjgucG5nP2g9/NzEwYjRkNTcmaXRv/az1pOHVId2VEWA",
  },
  {
    title: "ICT BASIC TO PRO 2.0",
    image:
      "https://imgs.search.brave.com/V4pdJcrIVyvGpDsbPNfx8UtMOctJmh6-k9iGdHBHTXg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzcxLzkxLzMx/LzM2MF9GXzQ3MTkx/MzE4NV9xRFA5T3FP/bER2WnhQWThWcjcx/UEp0aFMzNzFpN3Na/by5qcGc",
  },
  {
    title: "HSC - 27 ব্যাচ - অদম্য",
    image:
      "https://imgs.search.brave.com/aA_qXLydNzdSyopBi0-2YULSXpjh9j7HmOv-YQc5gYI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9veWMu/eWFsZS5lZHUvc2l0/ZXMvZGVmYXVsdC9m/aWxlcy9zdHlsZXMv/Y291cnNlX2RldGFp/bC9wdWJsaWMvMjAy/My0xMS9zaGlsbGVy/Ml8xLmpwZz9oPTQ0/YWNmYTRjJml0b2s9/VE5kZ0VYWnA",
  },
  {
    title: "ICT BASIC TO PRO 2.0",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
  {
    title: "HSC - 27 ব্যাচ - অদম্য",
    image:
      "https://imgs.search.brave.com/aA_qXLydNzdSyopBi0-2YULSXpjh9j7HmOv-YQc5gYI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9veWMu/eWFsZS5lZHUvc2l0/ZXMvZGVmYXVsdC9m/aWxlcy9zdHlsZXMv/Y291cnNlX2RldGFp/bC9wdWJsaWMvMjAy/My0xMS9zaGlsbGVy/Ml8xLmpwZz9oPTQ0/YWNmYTRjJml0b2s9/VE5kZ0VYWnA",
  },
];

export default function FeaturedSection() {
  return (
    <section className="bg-gradient-to-b from-primary/85 to-primary/60 py-12 px-4 pb-24 text-primary-foreground">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1 text-sm font-semibold bg-secondary text-secondary-foreground rounded-full mb-2">
          Featured Courses
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
          Discover Our Top Courses
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow, Parallax]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        speed={700}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        coverflowEffect={{ rotate: 8, stretch: 0, depth: 140, modifier: 1.2, slideShadows: false }}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 16 },
          640: { slidesPerView: 1.15, spaceBetween: 20 },
          1024: { slidesPerView: 1.6, spaceBetween: 24 },
          1280: { slidesPerView: 2.1, spaceBetween: 28 }
        }}
        className="container mx-auto featured-swiper"
        parallax={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="rounded-3xl overflow-hidden bg-card shadow-xl border border-border"
          >
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover scale-[1.02]"
              />
            </div>
            {/* overlay content */}
            <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6">
              <div className="backdrop-blur-sm bg-background/80 text-foreground border border-border rounded-2xl px-5 py-4 md:px-6 md:py-5 shadow-lg flex items-center justify-between gap-4">
                <div className="text-lg md:text-2xl font-bold leading-tight">{slide.title}</div>
                <a
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  View
                  <svg className="size-4" viewBox="0 0 20 20" fill="currentColor"><path d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"/></svg>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper custom overrides */}
      <style jsx global>{`
        /* Focus center slide more; dim sides */
        .featured-swiper .swiper-slide {
          transition: opacity 300ms ease, transform 300ms ease, filter 300ms ease;
        }
        .featured-swiper .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.6;
          transform: scale(0.98);
        }
        .featured-swiper .swiper-slide-prev,
        .featured-swiper .swiper-slide-next {
          opacity: 0.8;
          transform: scale(0.99);
        }
        /* Pagination bullets */
        .swiper-pagination-bullet {
          background: var(--secondary) !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: var(--secondary) !important;
          opacity: 1;
        }
        /* Navigation arrows */
        .swiper-button-next,
        .swiper-button-prev {
          color: var(--primary-foreground) !important;
          width: 42px;
          height: 42px;
          background: color-mix(in oklab, var(--primary) 30%, transparent);
          border-radius: 9999px;
          backdrop-filter: blur(6px);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: 700;
        }
      `}</style>
    </section>
  );
}
