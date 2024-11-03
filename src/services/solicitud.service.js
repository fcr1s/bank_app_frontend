import httpClient from "../http-common";

const obtenerSolicitudes = () => {
    return httpClient.get("/solicitudes/")
}

const obtenerSolicitudPorId = (id) => {
    return httpClient.get(`/solicitudes/${id}`)
}

const eliminarSolicitud = (id) => {
    return httpClient.delete(`/solicitudes/${id}`)
}

const crearSolicitud = (tipoPrestamo, valorPropiedad, montoPrestamo, tasaInteresAnual, plazo, documentos) => {
    return httpClient.post("/solicitudes/crear", documentos, {
        params: { tipoPrestamo, valorPropiedad, montoPrestamo, tasaInteresAnual, plazo }
    })
}

const obtenerSolicitudesDelCliente = () => {
    return httpClient.get("/solicitudes/mis-solicitudes")
}

const cancelarSolicitud = (solicitudId, rutCliente) => {
    return httpClient.put("/solicitudes/cancelar", null, {
        params: { solicitudId, rutCliente }
    })
}

export default { obtenerSolicitudes, obtenerSolicitudPorId, eliminarSolicitud, crearSolicitud, obtenerSolicitudesDelCliente, cancelarSolicitud };   