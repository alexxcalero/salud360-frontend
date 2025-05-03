package pe.edu.pucp.salud360.comunidad.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.pucp.salud360.comunidad.models.Comunidad;

@Repository
public interface ComunidadRepository extends JpaRepository<Comunidad, Integer> {
}
