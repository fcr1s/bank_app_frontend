import httpClient from "../http-common";

const guardarDocumento = (solicitudId, archivo) => {
    const formData = new FormData();
    formData.append('solicitudId', solicitudId);
    formData.append('documento', archivo);

    return httpClient.post("/documentos/guardar", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const obtenerDocumentosPorSolicitudId = (solicitudId) => {
    return httpClient.get(`/documentos/obtener/${solicitudId}`);
}

const descargarDocumento = (id) => {
    return httpClient.get(`/documentos/descargar/${id}`, { responseType: 'blob' });
}

export default { 
    guardarDocumento, 
    obtenerDocumentosPorSolicitudId, 
    descargarDocumento 
};
