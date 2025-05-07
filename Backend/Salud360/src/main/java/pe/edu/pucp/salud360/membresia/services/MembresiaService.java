package pe.edu.pucp.salud360.membresia.services;

import pe.edu.pucp.salud360.membresia.dto.MembresiaDTO;

import java.util.List;

public interface MembresiaService {
    MembresiaDTO crearMembresia(MembresiaDTO dto);
    List<MembresiaDTO> listarMembresias();
    MembresiaDTO buscarMembresiaPorId(Integer id);
    MembresiaDTO actualizarMembresia(Integer id, MembresiaDTO dto);
    boolean eliminarMembresia(Integer id);
}