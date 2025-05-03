package pe.edu.pucp.salud360.membresia.services;

import pe.edu.pucp.salud360.membresia.dto.PeriodoDTO;

import java.util.List;

public interface PeriodoService {
    List<PeriodoDTO> listarPeriodos();
    PeriodoDTO obtenerPeriodoPorId(Integer id);
    PeriodoDTO crearPeriodo(PeriodoDTO periodoDTO);
    PeriodoDTO actualizarPeriodo(Integer id, PeriodoDTO periodoDTO);
    void eliminarPeriodo(Integer id);
}
