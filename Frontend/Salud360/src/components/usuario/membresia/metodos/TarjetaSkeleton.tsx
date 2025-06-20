import Mastercard from "@/assets/method-mastercard.svg";
import Visa from "@/assets/method-visa.svg";
import Chip from "@/assets/tarjeta-design/chip.svg";
import FondoTarjeta1 from "@/assets/tarjeta-design/tarjeta1.svg";
import FondoTarjeta2 from "@/assets/tarjeta-design/tarjeta2.svg";
import FondoTarjeta3 from "@/assets/tarjeta-design/tarjeta3.svg";
import FondoTarjeta4 from "@/assets/tarjeta-design/tarjeta4.svg";
import FondoTarjeta5 from "@/assets/tarjeta-design/tarjeta5.svg";
import FondoTarjeta6 from "@/assets/tarjeta-design/tarjeta6.svg";
import { Shuffle } from "lucide-react";
import { DateTime } from "luxon";
import { useState } from "react";

const TarjetaSkeleton = ({
  numero,
  exp,
  nombre = "Jhon Doe",
  tipoTarjeta,
}: {
  numero: string;
  exp?: DateTime;
  nombre?: string;
  tipoTarjeta?: string;
}) => {
  const selectRandomBgImage = () =>
    [
      FondoTarjeta1,
      FondoTarjeta2,
      FondoTarjeta3,
      FondoTarjeta4,
      FondoTarjeta5,
      FondoTarjeta6,
    ][Math.floor(Math.random() * 6)];

  const [bgImage, setBgImage] = useState(selectRandomBgImage());
  return (
    <div className="relative">
      <button
        onClick={() => setBgImage(selectRandomBgImage())}
        className="bg-white border-1 border-neutral-300 p-1 rounded-full hover:bg-neutral-100 text-neutral-700 transition-all duration-150 ease-out absolute bottom-0 right-[-30px] z-50"
      >
        <Shuffle size={14} />
      </button>
      <section
        className="relative transform-3d z-2 group h-46 aspect-16/9 text-white"
        id="tarjeta"
      >
        <div
          className="p-4 backface-hidden absolute top-0 left-0 right-0 bottom-0 w-full h-full group-hover:transform-[rotateY(180deg)] transition-all duration-300 ease-out bg-cover overflow-hidden flex flex-col justify-end gap-1 rounded-md"
          id="delantera"
        >
          <img
            src={bgImage}
            alt="Fondo de tarjeta delantera"
            className="absolute top-0 left-0 right-0 bottom-0 z-[-1] object-cover w-full h-full"
          />
          <div className="logo-marca fixed top-4 right-4" id="logo-marca">
            {tipoTarjeta === "mastercard" && (
              <img
                src={Mastercard}
                alt="mastercard icon"
                className="aspect-auto h-5"
              />
            )}
            {tipoTarjeta === "visa" && (
              <img
                src={Visa}
                alt="mastercard icon"
                className="aspect-auto h-5"
              />
            )}
          </div>
          <div>
            <img src={Chip} alt="" className="aspect-auto h-8" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-left" id="numero">
              <p className="text-neutral-300 text-label-large">
                Número Tarjeta
              </p>
              <p className="numero">
                {numero
                  .padEnd(16, "#")
                  .slice(0, 16)
                  .match(/.{1,4}/g)
                  ?.join(" ")}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="text-left" id="nombre">
                <p className="text-neutral-300 text-label-large">
                  Nombre Tarjeta
                </p>
                <p className="nombre line-clamp-1 max-w-38 text-ellipsis">
                  {nombre.length !== 0 ? nombre : "Jhon Doe"}
                </p>
              </div>

              <div className="text-left" id="expiracion">
                <p className="text-neutral-300 text-label-large">Expiracion</p>
                <p className="expiracion">
                  <span className="mes">
                    {exp?.toFormat("LL", { locale: "es" }) !==
                    "Invalid DateTime"
                      ? exp?.toFormat("MM", { locale: "es" })
                      : "MM"}
                  </span>{" "}
                  /{" "}
                  <span className="year">
                    {exp?.toFormat("yyyy", { locale: "es" }) !==
                    "Invalid DateTime"
                      ? exp?.toFormat("yy", { locale: "es" })
                      : "AA"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-4 backface-hidden transform-[rotateY(180deg)] abolute top-0 left-0 right-0 bottom-0 w-full h-full group-hover:transform-[rotateY(0deg)] transition-all duration-300 ease-out overflow-hidden flex flex-col justify-end gap-3 rounded-md text-white"
          id="trasera"
        >
          <img
            src={bgImage}
            alt="Fondo de tarjeta delantera"
            className="absolute top-0 left-0 right-0 bottom-0 z-[-1] object-cover w-full h-full"
          />
          <div className="barra-magnetica w-full h-4 bg-black absolute top-4 left-0"></div>
          <div className="datos flex justify-between mb-4 gap-8">
            <div className="w-full" id="firma">
              <p className="label text-left mb-0.5">Firma</p>
              <div className="firma w-full h-4 bg-neutral-600"></div>
            </div>
            <div className="grupo" id="ccv">
              <p className="label text-left mb-0.5">CCV</p>
              <p className="ccv w-10 h-4 bg-white"></p>
            </div>
          </div>
          <p className="leyenda text-left text-label-small">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            exercitationem, voluptates illo.
          </p>
          <a href="#" className="link-banco text-left text-label-small">
            www.zzz.com
          </a>
        </div>
      </section>
    </div>
  );
};

export default TarjetaSkeleton;
