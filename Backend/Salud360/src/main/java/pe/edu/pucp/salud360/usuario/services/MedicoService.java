package pe.edu.pucp.salud360.usuario.services;

import pe.edu.pucp.salud360.usuario.dtos.MedicoDTO;

import java.util.List;

public interface MedicoService {
    MedicoDTO crearMedico(MedicoDTO medicoDTO);
    MedicoDTO actualizarMedico(Integer idMedico, MedicoDTO medicoDTO);
    void eliminarMedico(Integer idMedico);
    List<MedicoDTO> listarMedicosTodos();
    MedicoDTO buscarMedicoPorId(Integer idMedico);
}
