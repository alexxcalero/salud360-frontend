import DAB from "@/assets/DAB.jpg";

function CalendarioYReservas(){
    return(
        <section className="flex flex-col gap-4 px-4 py-8">
            <div className="flex flex-col gap-2 text-left">
                <h1>Calendario de Reservas</h1>
                <p>En este calendario puedes visualizar, reservar y anular citas o actividades:</p>
            </div>
            <img src={DAB} alt="DAB" />
        </section>
    );
}

export default CalendarioYReservas;