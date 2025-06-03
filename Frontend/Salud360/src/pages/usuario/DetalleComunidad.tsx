import HeroDetalleComunidad from "@/components/landing/HeroDetalleComunidad";
import heroImage from "@/assets/heroComunidades.png"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useComunidad } from "@/hooks/ComunidadContext";
import DAB from "@/assets/DAB.jpg";
import SelectLabel from "@/components/SelectLabel";
import ServicioConLocalesSection from "./ServicioConLocalesSection";
import UnderConstruction from "../UnderConstruction";
import CarrouselLocales from "@/components/usuario/CarrouselLocales";
import CardLocal from "@/components/usuario/CardLocal";
import CarrouselMedicos from "@/components/usuario/CarrouselMedicos";
//No funciona: //import PANDA from "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"


function DetalleComunidad(){
    const {comunidad} = useComunidad();
  
    const optionsSelect = [
      { value: "Hombre", content: "Hombre" },
      { value: "Mujer", content: "Mujer" },
      { value: "Rodrigo Roller", content: "Rodrigo Roller" },
    ];

    console.log(comunidad)

    const serviciosConLocales = comunidad.servicios.filter(
      (servicio: any) => servicio.locales && servicio.locales.length > 0
    );
    const tieneLocales = serviciosConLocales.length > 0
    //console.log("Los serviciosConLocales son:", serviciosConLocales)
    //console.log("Tiene locales? Es:", tieneLocales)

    const medicos: any[] = [];
    comunidad.servicios.forEach((servicio: any) => {
      if (servicio.citasMedicas && servicio.citasMedicas.length > 0) {
        servicio.citasMedicas.forEach((cita: any) => {
          if (cita.medico) {
            // Verifica que no esté repetido por ID
            const yaExiste = medicos.some((m) => m.idMedico === cita.medico.idMedico);
            if (!yaExiste) {
              medicos.push(cita.medico);
            }
          }
        });
      }
    });

    const tieneMedicos = medicos.length > 0
    console.log("Los medicos son:", medicos)
    console.log("Tiene medicos? Es:", tieneMedicos)

    return (
      <section className="flex flex-col mt-32 gap-32 px-32 mx-auto justify-center">

        <div className="flex flex-col gap-8">
          <h1>{comunidad.descripcion}</h1>
          <h2>{comunidad.proposito}</h2>
        </div>


        {tieneLocales && serviciosConLocales.map((servicio: any) => (
            <ServicioConLocalesSection servicio={servicio}/>
        ))}

        {tieneMedicos &&
          <>
            <section className="flex flex-col gap-16">
              <div className="text-left flex flex-col gap-2">
                <h3>Solicita ayuda de nuestros especialistas</h3>
                <hr className="border border-gray-500"/>
              </div>
              
              <CarrouselMedicos medicos={medicos}/>
            </section>
          </>
        }

        <section>
          <div className="text-left flex flex-col gap-2">
            <h3>Cuéntanos tu experiencia</h3>
            <hr className="border border-gray-500"/>
          </div>
          <div className="my-32">
            <UnderConstruction/>
          </div>
        </section>

      </section>
    );  
}

export default DetalleComunidad;

{/*
  
          <p>Messi:</p>
          <CardLocal local={serviciosConLocales[0].locales[0]}/>
          <p>arriba</p>
  */}
