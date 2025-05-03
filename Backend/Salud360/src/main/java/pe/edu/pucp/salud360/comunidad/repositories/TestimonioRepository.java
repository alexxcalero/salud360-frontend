package pe.edu.pucp.salud360.comunidad.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.pucp.salud360.comunidad.models.Testimonio;

public interface TestimonioRepository extends JpaRepository<Testimonio, Integer> {
}