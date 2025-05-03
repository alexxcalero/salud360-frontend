package pe.edu.pucp.salud360.comunidad.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.pucp.salud360.comunidad.models.Publicacion;

public interface PublicacionRepository extends JpaRepository<Publicacion, Integer> {

}
