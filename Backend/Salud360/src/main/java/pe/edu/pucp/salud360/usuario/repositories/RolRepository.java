package pe.edu.pucp.salud360.usuario.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.pucp.salud360.usuario.models.Rol;

import java.util.List;

public interface RolRepository extends JpaRepository<Rol, Integer> {
    @Query("SELECT r FROM Rol r JOIN r.permisos p WHERE p.idPermiso = :idPermiso")
    List<Rol> findAllByPermisoId(@Param("idPermiso") Integer idPermiso);
}
