import monkey from "@/assets/logoFooter.png";
import FooterImage1 from "@/assets/imagenFooter.png";
import { Instagram, Youtube, Linkedin, Twitter } from "lucide-react";

import { HashLink } from "react-router-hash-link";

function LandingFooter() {
  return (
    <footer className=" grid grid-rows-7 p-8 h-[430px] bg-[#2A86FF] text-white">
      <div className="row-span-6">
        <div className="grid grid-cols-6 text-left h-full">
          <div className="col-span-1  flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <img src={monkey} alt="mono logo" className="w-[55px] h-[48px]" />
              <div className="flex flex-row gap-4">
                <a href="https://x.com/fabianmr2806">
                  <Twitter />
                </a>
                <a href="https://www.linkedin.com/in/jeantomasto/">
                  <Linkedin />
                </a>
                <a href="https://www.youtube.com/@lacobraaa">
                  <Youtube />
                </a>
                <a href="https://www.instagram.com/valrod.p/?hl=es-la">
                  <Instagram />
                </a>
              </div>
            </div>
            <address>
              <p>Contáctanos</p>
              <p>
                <a href="mailto:a20210834@pucp.edu.pe">
                  📧 hola@monosupremos.com
                </a>
              </p>{" "}
              {/*EasterEgg ahhhh code*/}
              <p>📞 +51 987 654 321</p>
              <p>🕐 Lun - Vie | 8:00am - 6:00pm</p>
            </address>

            <img
              src={FooterImage1}
              alt="gym logos"
              className="w-[147px] h-[80px]"
            />
          </div>

          <div className="col-span-1  flex flex-col gap-8">
            <h3>
              <HashLink smooth to="/">
                Inicio
              </HashLink>
            </h3>

            <ul className="flex flex-col gap-4">
              <li>
                <HashLink smooth to="/#comunidadesHome">
                  Comunidades
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#localesHome">
                  Locales
                </HashLink>
              </li>
            </ul>
          </div>
          <div className="col-span-1  flex flex-col gap-8">
            <h3>
              <HashLink smooth to="comunidades">
                Comunidades
              </HashLink>
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <HashLink smooth to="/comunidades/#sobreLasComunidades">
                  Sobre las Comunidades
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/comunidades/#localesComunidades">
                  Explorar Comunidades
                </HashLink>
              </li>
            </ul>
          </div>
          <div className="col-span-1  flex flex-col gap-8">
            <h3>
              <HashLink smooth to="sobreNosotros">
                Sobre Nosotros
              </HashLink>
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <HashLink smooth to="/sobreNosotros/#quienesSomos">
                  Quiénes somos
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/sobreNosotros/#nuestraMision">
                  Misión
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/sobreNosotros/#nuestraVision">
                  Visión
                </HashLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row-span-1">
        <div className="flex flex-col justify-center align-center h-full gap-2">
          <hr />
          <small>© 2025 Monos Supremos. Todos los derechos reservados</small>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
