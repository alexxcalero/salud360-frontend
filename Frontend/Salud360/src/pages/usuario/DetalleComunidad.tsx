import HeroDetalleComunidad from "@/components/landing/HeroDetalleComunidad";
import heroImage from "@/assets/heroComunidades.png"
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useComunidad } from "@/hooks/ComunidadContext";
import DAB from "@/assets/DAB.jpg";
import SelectLabel from "@/components/SelectLabel";
import ServicioConLocalesSection from "./ServicioConLocalesSection";
import UnderConstruction from "../UnderConstruction";
import CarrouselLocales from "@/components/usuario/CarrouselLocales";
import CardLocal from "@/components/usuario/CardLocal";
import CarrouselMedicos from "@/components/usuario/CarrouselMedicos";
import CarrouselTestimonios from "@/components/usuario/CarrouselTestimonios";
import ModalTestimonio from "@/components/modals/ModalTestimonio";
import { crearTestimonio } from "@/services/testimonioService";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import SuccessModal from "@/components/modals/successModal";

//No funciona: //import PANDA from "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"


function DetalleComunidad(){
    const {comunidad} = useComunidad();
    const { usuario } = useContext(AuthContext);
  
    const [showSuccess, setShowSuccess] = useState(false);
    const [especialidad, setEspecialidad] = useState("__all__");
  
    const optionsSelect = [
      { value: "Hombre", content: "Hombre" },
      { value: "Mujer", content: "Mujer" },
      { value: "Rodrigo Roller", content: "Rodrigo Roller" },
    ];

    console.log("$$$:", comunidad)

    const serviciosConLocales = comunidad.servicios.filter(
      (servicio: any) => servicio.locales && servicio.locales.length > 0
    );
    const tieneLocales = serviciosConLocales.length > 0
    //console.log("Los serviciosConLocales son:", serviciosConLocales)
    //console.log("Tiene locales? Es:", tieneLocales)

    const testimonios = comunidad.testimonios;
    const tieneTestimonios = testimonios.length > 0
    //console.log("Los testimonios son:", testimonios)
    //console.log("Tiene testimonios? Es:", tieneTestimonios)
    const [showModalTestimonio, setShowModalTestimonio] = useState(false);

    const medicos = useMemo(() => {
      const lista: any[] = [];
      comunidad.servicios.forEach((servicio: any) => {
        if (servicio.citasMedicas && servicio.citasMedicas.length > 0) {
          servicio.citasMedicas.forEach((cita: any) => {
            if (cita.medico) {
              const yaExiste = lista.some((m) => m.idMedico === cita.medico.idMedico);
              if (!yaExiste) {
                lista.push(cita.medico);
              }
            }
          });
        }
      });
      return lista;
    }, [comunidad]);

    const tieneMedicos = medicos.length > 0
    console.log("Los medicos son:", medicos)
    console.log("Tiene medicos? Es:", tieneMedicos)

    const opcionesEspecialidades = Array.from(
      new Set(medicos.map((m) => m.especialidad))).map(
        (esp) => ({
          value: esp,
          content: esp
        })
    );

    const especialidades = [
      {value: "__all__", content: "Todas las especialidades"},
      ...opcionesEspecialidades
    ];
    
    const medicosFiltrados = useMemo(() => {
      if (especialidad === "__all__") return medicos;
      return medicos.filter((m) => m.especialidad === especialidad);
    }, [especialidad, medicos]);

    return (
    <>  
      <section className="flex flex-col mt-32 gap-32 px-32 mx-auto justify-center">
        <title>Detalle comunidad</title>
        <div className="flex flex-col gap-8">
          <h1>{comunidad.descripcion}</h1>
          <h2>{comunidad.proposito}</h2>
        </div>


        {tieneLocales && serviciosConLocales.map((servicio: any) => (
            <ServicioConLocalesSection servicio={servicio}/>
        ))}

        {tieneMedicos &&
          <>
            <section className="flex flex-col gap-8">
              <div className="text-left flex flex-col gap-2">
                <h3>Solicita ayuda de nuestros especialistas</h3>
                <hr className="border border-gray-500"/>
              </div>
              
              <div className="w-[600px]">
                <SelectLabel options={especialidades} placeholder="Seleccione una especialdiad" htmlFor="text" label="Especialidades" value={especialidad} onChange={(e) => setEspecialidad(e)}/>
              </div>

              <CarrouselMedicos medicos={medicosFiltrados}/>
            </section>
          </>
        }

        <section>
          <div className="text-left flex flex-col gap-2">
            <h3>Cuéntanos tu experiencia</h3>
            <hr className="border border-gray-500"/>
          </div>
          <div className="my-32">
            {tieneTestimonios &&
              <div className="flex gap-6 flex-wrap justify-center">
                {tieneTestimonios && (
                  <CarrouselTestimonios
                    testimonios={testimonios}
                    onAddClick={() => setShowModalTestimonio(true)}
                  />
                )}
              </div>
            }
          </div>
        </section>

      </section>
      {showModalTestimonio && (
        <ModalTestimonio
          onClose={() => setShowModalTestimonio(false)}
          onSubmit={async (comentario, calificacion) => {
            try {
              console.log("Enviando testimonio:", {
                comentario,
                calificacion,
                idComunidad: comunidad.idComunidad ,
                autor: { idCliente: usuario.idCliente }
              });

              await crearTestimonio({
                comentario,
                calificacion,
                idComunidad: comunidad.idComunidad,
                autor: {
                  idCliente: usuario.idCliente,
                },
              });
              setShowModalTestimonio(false);
              setShowSuccess(true);
            } catch (err) {
              alert("Ocurrió un error al guardar tu testimonio");
              console.error(err);
            }
          }}
        />
      )}
      {showSuccess && (
        <SuccessModal
          open={showSuccess}
          setOpen={setShowSuccess}
          title="¡Testimonio enviado!"
          description="Gracias por compartir tu experiencia con la comunidad."
          onConfirm={() => window.location.reload()} // o refetch si usas context
        />
      )}

    </>
    );  
}

export default DetalleComunidad;

{/*
  
          <p>Messi:</p>
          <CardLocal local={serviciosConLocales[0].locales[0]}/>
          <p>arriba</p>
  */}
