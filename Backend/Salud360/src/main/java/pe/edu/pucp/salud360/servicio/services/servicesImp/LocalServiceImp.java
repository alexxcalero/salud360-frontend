package pe.edu.pucp.salud360.servicio.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.servicio.dto.LocalDTO;
import pe.edu.pucp.salud360.servicio.repositories.LocalRepository;
import pe.edu.pucp.salud360.servicio.services.LocalService;

import java.util.List;

@Service
public class LocalServiceImp implements LocalService {
    @Autowired
    private LocalRepository localRepository;

    @Override
    public LocalDTO crearLocal(LocalDTO localDTO) {
        return null;
    }

    @Override
    public LocalDTO actualizarLocal(Integer idLocal, LocalDTO localDTO) {
        return null;
    }

    @Override
    public void eliminarLocal(Integer idLocal) {

    }

    @Override
    public List<LocalDTO> listarLocalesTodos() {
        return List.of();
    }

    @Override
    public LocalDTO buscarLocalPorId(Integer idLocal) {
        return null;
    }
}
