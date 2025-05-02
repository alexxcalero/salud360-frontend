package pe.edu.pucp.salud360.usuario.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.pucp.salud360.usuario.models.Permiso;

public interface PermisoRepository extends JpaRepository<Permiso, Integer> {
}
