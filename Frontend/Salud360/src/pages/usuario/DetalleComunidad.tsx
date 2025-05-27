import HeroDetalleComunidad from "@/components/landing/HeroDetalleComunidad";
import heroImage from "@/assets/heroComunidades.png"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useComunidad } from "@/hooks/ComunidadContext";
import DAB from "@/assets/DAB.jpg";
import SelectLabel from "@/components/SelectLabel";

function DetalleComunidad(){
    const {comunidad} = useComunidad();
  
    const optionsSelect = [
      { value: "Hombre", content: "Hombre" },
      { value: "Mujer", content: "Mujer" },
      { value: "Rodrigo Roller", content: "Rodrigo Roller" },
    ];

    console.log(comunidad)

    return (
      <section className="flex flex-col mt-32 gap-32 px-32 mx-auto justify-center">

        <div className="flex flex-col gap-8">
          <h1>{comunidad.descripcion}</h1>
          <h2>{comunidad.proposito}</h2>
        </div>


        <section className="flex flex-col gap-16">
          <div className="text-left flex flex-col gap-2">
            <h3>Únete a nuestros distintos locales...</h3>
            <hr className="border border-gray-500"/>
          </div>
          <img src={DAB} alt="DAB" />
        </section>

        <section className="flex flex-col gap-16">
          <div className="text-left flex flex-col gap-2">
            <h3>Solicita ayuda de nuestos especialistas</h3>
            <hr className="border border-gray-500"/>
          </div>
          <div className="text-right">
            <SelectLabel options={optionsSelect} placeholder="Seleccione un especialista" htmlFor="email" label="Especialistas:" />
          </div>
          <img src={DAB} alt="DAB" />
        </section>

        <section>
          <div className="text-left flex flex-col gap-2">
            <h3>Cuéntanos tu experiencia</h3>
            <hr className="border border-gray-500"/>
          </div>
          <div className="my-32">
            a
          </div>
        </section>

      </section>
    );  
}

export default DetalleComunidad;