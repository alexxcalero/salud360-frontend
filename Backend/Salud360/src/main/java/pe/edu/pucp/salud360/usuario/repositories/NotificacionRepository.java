package pe.edu.pucp.salud360.usuario.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.pucp.salud360.usuario.models.Notificacion;

public interface NotificacionRepository extends JpaRepository<Notificacion, Integer> {
}
