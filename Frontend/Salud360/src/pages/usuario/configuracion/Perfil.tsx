import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de tener esto bien configurado
import InputIconLabel from "@/components/InputIconLabel";

function Perfil() {
  const [showModalLogout, setShowModalLogout] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <section className="flex gap-4 mb-8">
        <figure>
          <img src="" alt="Foto de perfil" />
        </figure>
        <div>
          <h1 className="text-left">Fabián Alejandro Montenegro Rufasto</h1>
          <span className="block text-left">
            Papá primerizo de 3 bellos hijos: Jean Paul, Rodrigo y Alex
          </span>
          <span className="block text-left">
            Miembro desde: <time dateTime="2025-09-04">09/04/2025</time>
          </span>
        </div>
      </section>

      <section className="grid grid-cols-2 justify-start place-items-stretch gap-4 mb-8">
        <InputIconLabel icon={<></>} htmlFor="nombres" label="Nombres" />
        <InputIconLabel icon={<></>} htmlFor="apellidos" label="Apellidos" />
        <div className="col-span-full">
          <InputIconLabel icon={<></>} htmlFor="correo-electronico" label="Correo electrónico" />
        </div>
        <InputIconLabel icon={<></>} htmlFor="telefono" label="Teléfono" />
        <InputIconLabel icon={<></>} htmlFor="genero" label="Género" />
        <InputIconLabel icon={<></>} htmlFor="ubicacion" label="Ubicación" />
        <InputIconLabel icon={<></>} htmlFor="fecha-nacimiento" label="Fecha de nacimiento" />
        <InputIconLabel icon={<></>} htmlFor="tipo-documento" label="Tipo de documento" />
        <InputIconLabel icon={<></>} htmlFor="numero-documento" label="Número de documento" />
      </section>

      <hr />

      <section className="mt-8 flex flex-col gap-4">
        <InputIconLabel icon={<></>} htmlFor="contrasenia-antigua" label="Contraseña antigua" />
        <InputIconLabel icon={<></>} htmlFor="contrasenia-nueva" label="Contraseña nueva" />
        <InputIconLabel icon={<></>} htmlFor="confirmar-contrasenia-nueva" label="Confirmar contraseña nueva" />
      </section>

      {/* Botón cerrar sesión */}
      <button
        className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded w-max self-end"
        onClick={() => setShowModalLogout(true)}
      >
        Cerrar sesión
      </button>

      {/* Modal de confirmación */}
      {showModalLogout && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-300 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">!</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">¿Deseas cerrar sesión?</h2>
              <p className="mb-6">Serás redirigido a la pantalla de inicio</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                  onClick={() => setShowModalLogout(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => {
                    setShowModalLogout(false);
                    navigate("/"); // Reemplaza "/" con la ruta que corresponda a tu login o inicio
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Perfil;
