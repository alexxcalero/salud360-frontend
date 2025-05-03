package pe.edu.pucp.salud360.membresia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.pucp.salud360.membresia.models.Solicitud;

public interface SolicitudRepository extends JpaRepository<Solicitud, Integer> {
}
