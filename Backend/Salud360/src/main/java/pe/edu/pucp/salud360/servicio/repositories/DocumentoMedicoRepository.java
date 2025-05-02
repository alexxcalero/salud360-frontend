package pe.edu.pucp.salud360.servicio.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.pucp.salud360.servicio.models.DocumentoMedico;

public interface DocumentoMedicoRepository extends JpaRepository<DocumentoMedico, Integer> {
}
