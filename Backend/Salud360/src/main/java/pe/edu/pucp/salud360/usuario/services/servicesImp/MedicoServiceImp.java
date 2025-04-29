package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.dto.MedicoDTO;
import pe.edu.pucp.salud360.usuario.repositories.MedicoRepository;
import pe.edu.pucp.salud360.usuario.services.MedicoService;

import java.util.List;

@Service
public class MedicoServiceImp implements MedicoService {
    @Autowired
    private MedicoRepository medicoRepository;

    @Override
    public MedicoDTO crearMedico(MedicoDTO medicoDTO) {
        return null;
    }

    @Override
    public MedicoDTO actualizarMedico(Integer idMedico, MedicoDTO medicoDTO) {
        return null;
    }

    @Override
    public void eliminarMedico(Integer idMedico) {

    }

    @Override
    public List<MedicoDTO> listarMedicosTodos() {
        return List.of();
    }

    @Override
    public MedicoDTO buscarMedicoPorId(Integer idMedico) {
        return null;
    }
}
