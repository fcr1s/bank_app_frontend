import httpClient from "../http-common";

const loginEjecutivo = (rut, password) => {
  return httpClient.post("/ejecutivos/login", null, {
      params: { rut, password }
  })
}

const logoutEjecutivo = () => {
  return httpClient.post("/ejecutivos/logout")
}

const obtenerSolicitudes = (estado) => {
  return httpClient.get("/ejecutivos/solicitudes", {
      params: { estado }
  })
}

const actualizarEstadoSolicitud = (id, nuevoEstado) => {
  return httpClient.put(`/ejecutivos/solicitudes/${id}/estado`, null, {
      params: { nuevoEstado }
  })
}

const evaluarSolicitud = (solicitudId, ingresosMensuales, buenHistorialCrediticio, antiguedadLaboral, totalDeudas, edadCliente, saldoCuenta, saldoConsistente, totalDepositos, antiguedadCuenta, porcentajeRetiroReciente) => {
  return httpClient.put(`/ejecutivos/evaluar-solicitud/${solicitudId}`, null, {
      params: { ingresosMensuales, buenHistorialCrediticio, antiguedadLaboral, totalDeudas, valorPropiedad, edadCliente, saldoCuenta, saldoConsistente, totalDepositos, antiguedadCuenta, porcentajeRetiroReciente }
  })
}


export default { loginEjecutivo, logoutEjecutivo, obtenerSolicitudes, actualizarEstadoSolicitud, evaluarSolicitud };