import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../env/environment.prod";
import { CarView } from "./carrusel.interface";

export default function Carrusel() {
  const apiBase = apiUrl;
  const navigator = useNavigate();
  const [cars, setCars] = useState<CarView[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiBase}/vehicles/all`);
      const carData = await response.json();
      setCars(carData);
    };

    fetchData();
  }, []);

  const images: CarView[] = cars;

  const [selectedIndex, setSelectedIndex] = useState(1);
  const sliceIzquierda =
    images[selectedIndex < 1 ? images.length - 1 : selectedIndex - 1];
  const slicePrincipal = images[selectedIndex];
  const sliceDerecha =
    images[selectedIndex < images.length - 1 ? selectedIndex + 1 : 0];
  const previus = () => {
    if (selectedIndex <= 0) {
      setSelectedIndex(images.length - 1);
    } else {
      setSelectedIndex((state) => state - 1);
    }
  };
  const next = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedIndex((state) => state + 1);
    } else {
      setSelectedIndex(0);
    }
  };

  const [isAutoplay, setIsAutoplay] = useState(true);

  const autoplayInterval = 2000;

  useEffect(() => {
    let autoplayId: number;

    if (isAutoplay) {
      autoplayId = setInterval(() => {
        next();
      }, autoplayInterval);
    }

    return () => clearInterval(autoplayId);
  }, [isAutoplay, next]);

  return (
    <>
      {cars.length > 0 && (
        <section className="h-full max-w-full">
          <div className="mb-8">
            <h1 className="text-center font-sans font-bold text-text text-2xl">
              Conocé nuestra flota
            </h1>
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="flex flex-row align-bottom">
              <div className="flex flex-shrink-0 flex-col self-center">
                <img
                  className="w-[297.44px] h-[202.91px] justify-center "
                  src={sliceIzquierda.image}
                  alt="image"
                />
                <h2 className="font-sans text-3xl text-center max-w-72">
                  {sliceIzquierda.model}
                </h2>
                <p className="font-sans text-center max-w-72 ">
                  {sliceIzquierda.brand}
                </p>
              </div>
              <button onClick={previus}>
                <svg
                  className="rotate-180"
                  width="36"
                  height="50"
                  viewBox="0 0 36 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.2977 27.2964L10.9227 48.264C9.30703 49.7133 6.69453 49.7133 5.09609 48.264L1.21172 44.7797C-0.403906 43.3305 -0.403906 40.987 1.21172 39.5532L17.7805 24.6909L1.21172 9.82857C-0.403906 8.37933 -0.403906 6.0359 1.21172 4.60208L5.07891 1.08692C6.69453 -0.362308 9.30703 -0.362308 10.9055 1.08692L34.2805 22.0545C35.9133 23.5038 35.9133 25.8472 34.2977 27.2964Z"
                    fill="#707070"
                  />
                </svg>
              </button>
              <div className="flex-shrink-0 flex flex-col align-middle justify-between">
                <img
                  className="w-[445px] justify-center object-cover"
                  src={slicePrincipal.image}
                  alt="image"
                />
                <h2 className="font-sans text-3xl text-center max-w-[445px] object-cover">
                  {slicePrincipal.model}
                </h2>
                <p className="font-sans text-center max-w-[445px] max-h-[31.05px] object-cover">
                  {slicePrincipal.brand}
                </p>
              </div>
              <button onClick={next}>
                <svg
                  width="36"
                  height="50"
                  viewBox="0 0 36 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M34.2977 27.2964L10.9227 48.264C9.30703 49.7133 6.69453 49.7133 5.09609 48.264L1.21172 44.7797C-0.403906 43.3305 -0.403906 40.987 1.21172 39.5532L17.7805 24.6909L1.21172 9.82857C-0.403906 8.37933 -0.403906 6.0359 1.21172 4.60208L5.07891 1.08692C6.69453 -0.362308 9.30703 -0.362308 10.9055 1.08692L34.2805 22.0545C35.9133 23.5038 35.9133 25.8472 34.2977 27.2964Z"
                    fill="#707070"
                  />
                </svg>
              </button>
              <div className="flex flex-shrink-0 flex-col self-center">
                <img
                  className="w-[297.44px] h-[202.91px] justify-center "
                  src={sliceDerecha.image}
                  alt="image"
                />
                <h2 className="font-sans text-3xl text-center max-w-72">
                  {sliceDerecha.model}
                </h2>
                <p className="font-sans text-center max-w-72">
                  {sliceDerecha.brand}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center align-bottom">
            <button
              onClick={() => {
                navigator("/categoriasDeVehiculos/all");
              }}
              type="button"
              className="border-orange-600 border-2 text-orange-600 py-4 px-10 rounded-md mt-8"
            >
              Mirá todos los Autos
            </button>
          </div>
        </section>
      )}
    </>
  );
}
