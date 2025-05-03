package pe.edu.pucp.salud360.comunidad.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.pucp.salud360.comunidad.models.Comentario;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Integer> {
    // Puedes agregar métodos personalizados aquí si los necesitas luego
}
