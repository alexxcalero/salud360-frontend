import { useEffect, useState } from "react";
import { baseAPI } from "@/services/baseAPI";

function DashboardPage() {
  const [usuarios, setUsuarios] = useState<number>(0);
  const [comunidades, setComunidades] = useState<number>(0);
  const [medicos, setMedicos] = useState<number>(0);
  const [labelsMeses, setLabelsMeses] = useState<string[]>([]);
  const [usuariosPorMes, setUsuariosPorMes] = useState<number[]>([]);
  const [topComunidades, setTopComunidades] = useState<{ nombre: string, cantMiembros: number }[]>([]);


  
  const [isLaptop, setIsLaptop] = useState(false);

  const updateLayout = () => {
    const width = window.innerWidth;
    console.log("El innerWidth es:", width);
    const shouldBeLaptop = width < 1540;
    setIsLaptop(shouldBeLaptop);
    console.log("setIsLaptop debe ser", shouldBeLaptop);
    // No uses isLaptop aquí, aún no ha cambiado.
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  useEffect(() => {
    console.log("Estamos en laptop? (actualizado)", isLaptop);
  }, [isLaptop]);



  const accesosRapidos = [
    { texto: "Crear Comunidad", ruta: "/admin/comunidades/crear" },
    { texto: "Crear Servicio", ruta: "/admin/servicios/crear" },
    { texto: "Crear Local", ruta: "/admin/locales/crear" },
    { texto: "Crear Usuario", ruta: "/admin/usuarios/crear/usuario" },
    { texto: "Crear Admin", ruta: "/admin/usuarios/crear/admin" },
    { texto: "Crear Personal Médico", ruta: "/admin/personalMedico/crear" }
  ];
  useEffect(() => {
    // Obtener usuarios y preparar data para gráfico
    baseAPI.get("/admin/clientes", {
      auth: { username: "admin", password: "admin123" }
    })
      .then(res => {
        const data = res.data;
        setUsuarios(data.length);

        const conteoPorMes: Record<string, number> = {};
        const etiquetasMeses: string[] = [];
        const hoy = new Date();
        const start = new Date(2025, 0); // Enero 2025
        const opciones = { month: 'short' } as const;
        const locale = 'es-ES';

        while (start <= hoy) {
          const clave = `${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, '0')}`;
          const label = start.toLocaleDateString(locale, opciones).replace(".", "");
          etiquetasMeses.push(label);
          conteoPorMes[clave] = 0;
          start.setMonth(start.getMonth() + 1);
        }

        data.forEach((cli: any) => {
          if (!cli.fechaCreacion) return;
          const fecha = new Date(cli.fechaCreacion);
          const clave = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
          if (clave in conteoPorMes) conteoPorMes[clave]++;
        });

        setLabelsMeses(etiquetasMeses);
        setUsuariosPorMes(Object.values(conteoPorMes));
      })
      .catch(err => console.error("Error cargando usuarios", err));

    // Comunidades
    baseAPI.get("/comunidades", {
      auth: { username: "admin", password: "admin123" }
    })
      .then(res => {
        const data = res.data;
        setComunidades(data.length);
        const top10 = [...data]
          .sort((a: any, b: any) => b.cantUsuarios - a.cantUsuarios)
          .slice(0, 10);
        setTopComunidades(top10);
      })
      .catch(err => console.error("Error cargando comunidades", err));

    // Médicos
    baseAPI.get("/admin/medicos", {
      auth: { username: "admin", password: "admin123" }
    })
      .then(res => setMedicos(res.data.length))
      .catch(err => console.error("Error cargando médicos", err));
  }, []);

  const urlGraficoUsuarios = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
    type: "line",
    data: {
      labels: labelsMeses,
      datasets: [{
        label: "Usuarios",
        data: usuariosPorMes,
        fill: true,
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.5)"
      }]
    },
    options: {
      scales: {
        y: {
          ticks: {
            precision: 0
          }
        }
      },
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
      }
    }
  }))}`;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* Métricas superiores */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl text-black font-semibold">Usuarios</p>
          <p className="text-2xl font-bold">{usuarios}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl text-black font-semibold">Comunidades</p>
          <p className="text-2xl font-bold">{comunidades}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl text-black font-semibold">Médicos</p>
          <p className="text-2xl font-bold">{medicos}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl text-black font-semibold">Ganancias</p>
          <p className="text-2xl font-bold">$10.3M</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        <div className="col-span-7 bg-white p-1 rounded shadow h-[660px] flex flex-col items-center justify-start">
          <h2 className="text-2xl font-bold text-center mt-2 mb-2">Usuarios Nuevos por Mes</h2>
          <iframe
            title="Gráfico de usuarios"
            className={`w-[1050px] h-[650px] border-none transform origin-mid ${isLaptop ? 'scale-[0.55] ' : 'scale-[0.75]' }`}
            src={urlGraficoUsuarios}
          />
        </div>

        <div className="col-span-5 bg-white p-1 rounded shadow h-[660px] flex flex-col items-center justify-start">
          <h2 className="text-2xl font-bold text-center mt-2 mb-2">Distribución de Membresías</h2>
          <iframe
            title="Distribución de membresías"
            className={`w-[1050px] h-[650px] border-none transform origin-mid ${isLaptop ? 'scale-[0.55] ' : 'scale-[0.75]' }`}
            src="https://quickchart.io/chart?c=%7B%22type%22%3A%22doughnut%22%2C%22options%22%3A%7B%22layout%22%3A%7B%22padding%22%3A0%7D%2C%22plugins%22%3A%7B%22legend%22%3A%7B%22position%22%3A%22top%22%2C%22align%22%3A%22center%22%7D%7D%7D%2C%22data%22%3A%7B%22labels%22%3A%5B%22Con%20Tope%22%2C%22Sin%20Tope%22%2C%22Inactivos%22%5D%2C%22datasets%22%3A%5B%7B%22data%22%3A%5B50%2C15%2C35%5D%2C%22backgroundColor%22%3A%5B%22%2336A2EB%22%2C%22%23FFCE56%22%2C%22%23FF6384%22%5D%7D%5D%7D%7D"
          />
        </div>
      </div>

      {/* Secciones inferiores */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Top Comunidades</h3>
          <ul className="space-y-2">
            {topComunidades.map((comunidad, index) => (
              <li key={index} className="flex justify-between border-b pb-1">
                <span>{comunidad.nombre}</span>
                <span className="text-green-600 font-semibold">{comunidad.cantMiembros} miembros</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Accesos Rápidos</h3>
          <ul className="space-y-2 text-left">
            {accesosRapidos.map((item, index) => (
              <li key={index} className="border-b pb-1">
                <a
                  href={item.ruta}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {item.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
