package pe.edu.pucp.salud360.control.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.pucp.salud360.control.models.Reporte;

@Repository
public interface ReporteRepository extends JpaRepository<Reporte, Integer> {
}

