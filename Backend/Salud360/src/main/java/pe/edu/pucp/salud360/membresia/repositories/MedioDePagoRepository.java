package pe.edu.pucp.salud360.membresia.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import pe.edu.pucp.salud360.membresia.models.MedioDePago;

public interface MedioDePagoRepository extends JpaRepository<MedioDePago, Integer> {
}

