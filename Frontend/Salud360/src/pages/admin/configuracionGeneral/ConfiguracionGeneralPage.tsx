/*import UnderConstruction from "@/pages/UnderConstruction";

function ConfiguracionGeneralPage(){
    return <UnderConstruction/>;
}

export default ConfiguracionGeneralPage;
*/

import InfoCard from "@/components/Infocard";
import ButtonIcon from "@/components/ButtonIcon";
import BlueBullet from "@/components/BlueBullet";
import { Pencil } from "lucide-react";

function ConfiguracionGeneralPage() {
  return (
    <div className="w-full px-6 py-4">
      <h1 className="text-3xl font-bold mb-4">Configuración general</h1>

      {/* Imagen */}
      <div className="flex justify-center mb-4">
        <img
          src="/src/assets/LogoMono.jpg"
          alt="Logo"
          className="rounded-full w-60 h-60 object-cover border-4 border-blue-400"
        />
      </div>

      {/* Botón editar alineado a la izquierda */}
      <div className="flex justify-start mb-6">
        <ButtonIcon icon={<Pencil className="w-5 h-5 text-white" />} size="lg" variant="primary">
          Editar
        </ButtonIcon>
      </div>

      {/* Cuadro principal */}
<div className="grid grid-cols-2 gap-4">
  {/* COLUMNA IZQUIERDA DE DATOS - PROPÓSITO , MISION Y VISIÓN*/}
  <div className="grid grid-rows-3 gap-4 h-full">
    <InfoCard
    title="Propósito"
    text={<BlueBullet>Impulsar el bienestar integral de las personas a través de experiencias personalizadas de salud física y mental.</BlueBullet>}
    className="h-full"
    />

    <InfoCard
    title="Misión"
    text={<BlueBullet>Brindar acceso a servicios de yoga, ejercicio físico y salud de calidad mediante comunidades que promueven el crecimiento personal.</BlueBullet>}
    className="h-full"
    />

    <InfoCard
    title="Visión"
    text={<BlueBullet>Ser la plataforma de bienestar más confiable y cercana de la región, reconocida por transformar vidas a través de hábitos saludables y comunidades activas.</BlueBullet>}
    className="h-full"
    />
  </div>

  {/* COLUMNA DERECHA - PRINCIPIOS */}
  <div className="h-full">
    <InfoCard
      title="Principios"
      className="h-full leading-loose space-y-2"
      text={
        <div>
          <BlueBullet>Ponemos a la persona en el centro de todo lo que hacemos.</BlueBullet>
          <BlueBullet>Promovemos un estilo de vida saludable, sostenible y alineado con el bienestar físico, emocional y mental.</BlueBullet>
          <BlueBullet>Fomentamos la conexión comunitaria como parte esencial del crecimiento personal.</BlueBullet>
          <BlueBullet>Nos comprometemos con la mejora continua de nuestros servicios, tecnologías y espacios.</BlueBullet>
          <BlueBullet>Actuamos con integridad, respeto y empatía en cada interacción.</BlueBullet>
          <BlueBullet>Impulsamos la innovación para hacer del bienestar una experiencia accesible y motivadora.</BlueBullet>
        </div>
      }
      className="h-full"
    />
  </div>
</div>

      {/* Información de contacto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <InfoCard
          title="Dirección"
          text={<BlueBullet>Av. Perú 699</BlueBullet>}
        />
        <InfoCard
          title="Teléfono"
          text={<BlueBullet>(+51) 944 561 920</BlueBullet>}
        />
        <InfoCard
          title="Horarios de atención"
          text={
            <div className="flex flex-col gap-1">
              <BlueBullet>Lunes - Viernes 7:00 a.m. - 8:00 p.m.</BlueBullet>
              <BlueBullet>Sábados 9:00 a.m. - 5:00 p.m.</BlueBullet>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default ConfiguracionGeneralPage;