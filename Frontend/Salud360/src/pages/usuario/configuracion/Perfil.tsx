import InputIconLabel from "@/components/InputIconLabel";

function Inicio() {
  return (
    <div className="p-8">
      <section className="flex gap-4 mb-8">
        <figure>
          <img src="" alt="Foto de perfil" />
        </figure>
        <div>
          <h1 className="text-left">Fabián Alejandro Montenegro Rufasto</h1>
          <span className="block text-left">
            Papá primerizo de 3 bellos hijos: jean Paul, Rodrigo y Alex
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
          <InputIconLabel
            icon={<></>}
            htmlFor="correo-electronico"
            label="Correo electrónico"
          />
        </div>
        <InputIconLabel icon={<></>} htmlFor="telefono" label="Teléfono" />
        <InputIconLabel icon={<></>} htmlFor="genero" label="Género" />
        <InputIconLabel icon={<></>} htmlFor="ubicacion" label="Ubicación" />
        <InputIconLabel
          icon={<></>}
          htmlFor="fecha-nacimiento"
          label="Fecha de nacimiento"
        />
        <InputIconLabel
          icon={<></>}
          htmlFor="tipo-documento"
          label="Tipo de documento"
        />
        <InputIconLabel
          icon={<></>}
          htmlFor="numero-documento"
          label="Número de documento"
        />

        {/* <div>
          <label htmlFor="genre">Género</label>
          <select id="genre" name="genre" required>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div> */}
        {/* <div>
          <label htmlFor="doc-type">Tipo de documento</label>
          <select id="doc-type" name="doc-type" required>
            <option value="M">DNI</option>
            <option value="F">Carné de extranjería</option>
          </select>
        </div>
        <div>
          <label htmlFor="num-doc">Número de documento</label>
          <input type="number" name="num-doc" id="num-doc" required />
        </div> */}
      </section>
      <hr />
      <section className="mt-8 flex flex-col gap-4">
        <InputIconLabel
          icon={<></>}
          htmlFor="contrasenia-antigua"
          label="Contraseña antigua"
        />
        <InputIconLabel
          icon={<></>}
          htmlFor="contrasenia-nueva"
          label="Contraseña nueva"
        />
        <InputIconLabel
          icon={<></>}
          htmlFor="confirmar-contrasenia-nueva"
          label="Confirmar contraseña nueva"
        />
      </section>
    </div>
  );
}

export default Inicio;
