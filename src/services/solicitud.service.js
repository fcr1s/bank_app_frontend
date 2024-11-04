import httpClient from "../http-common";

const obtenerSolicitudes = () => {
    return httpClient.get("/solicitudes/");
}

const obtenerSolicitudPorId = (id) => {
    return httpClient.get(`/solicitudes/${id}`);
}

const eliminarSolicitud = (id) => {
    return httpClient.delete(`/solicitudes/${id}`);
}

const crearSolicitud = (tipoPrestamo, valorPropiedad, montoPrestamo, tasaInteresAnual, plazo, documentos) => {
    const formData = new FormData();
    formData.append('tipoPrestamo', tipoPrestamo);
    formData.append('valorPropiedad', valorPropiedad);
    formData.append('montoPrestamo', montoPrestamo);
    formData.append('tasaInteresAnual', tasaInteresAnual);
    formData.append('plazo', plazo);
    
    // Agregar documentos al FormData
    documentos.forEach((documento) => {
        formData.append('documentos', documento);
    });

    return httpClient.post("/solicitudes/crear", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const obtenerSolicitudesDelCliente = () => {
    return httpClient.get("/solicitudes/mis-solicitudes");
}

const cancelarSolicitud = (solicitudId) => {
    return httpClient.put("/solicitudes/cancelar", null, {
        params: { solicitudId}
    });
}

export default { 
    obtenerSolicitudes, 
    obtenerSolicitudPorId, 
    eliminarSolicitud, 
    crearSolicitud, 
    obtenerSolicitudesDelCliente, 
    cancelarSolicitud 
};
