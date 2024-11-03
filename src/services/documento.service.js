import httpClient from "../http-common";

const guardarDocumento = (documento) => {
    return httpClient.post("/documentos/guardar", documento)
}

const obtenerDocumentosPorRutCliente = (rutCliente) => {
    return httpClient.get("/documentos/obtener", {
        params: { rutCliente }
    })
}

const obtenerDocumentosPorSolicitudId = (solicitudId) => {
    return httpClient.get(`/documentos/obtener/${solicitudId}`)
}

const actualizarDocumentos = (solicitudId, nuevosDocumentos) => {
    return httpClient.put("/documentos/actualizar", nuevosDocumentos, {
        params: { solicitudId }
    })
}

export default { guardarDocumento, obtenerDocumentosPorRutCliente, obtenerDocumentosPorSolicitudId, actualizarDocumentos };

