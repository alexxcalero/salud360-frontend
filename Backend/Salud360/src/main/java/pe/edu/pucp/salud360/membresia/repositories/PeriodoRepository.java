package pe.edu.pucp.salud360.membresia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.pucp.salud360.membresia.models.Periodo;

public interface PeriodoRepository extends JpaRepository<Periodo, Integer> {
}