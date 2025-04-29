package pe.edu.pucp.salud360.servicio.services;

import pe.edu.pucp.salud360.servicio.dto.LocalDTO;

import java.util.List;

public interface LocalService {
    LocalDTO crearLocal(LocalDTO localDTO);
    LocalDTO actualizarLocal(Integer idLocal, LocalDTO localDTO);
    void eliminarLocal(Integer idLocal);
    List<LocalDTO> listarLocalesTodos();
    LocalDTO buscarLocalPorId(Integer idLocal);
}
