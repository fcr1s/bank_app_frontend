import httpClient from "../http-common";

const guardarPrestamo = (prestamo) => {
    return httpClient.post("/prestamos/guardar", prestamo);
}

const obtenerTodosLosPrestamos = () => {
    return httpClient.get("/prestamos/");
}

const obtenerPrestamoPorId = (id) => {
    return httpClient.get(`/prestamos/${id}`);
}

const eliminarPrestamo = (id) => {
    return httpClient.delete(`/prestamos/${id}`);
}

const obtenerPrestamoPorSolicitudId = (solicitudId) => {
    return httpClient.get(`/prestamos/solicitud/${solicitudId}`);
}

const responderPrestamo = (id, aceptar) => {
    return httpClient.post(`/prestamos/${id}/respuesta`, null, {
        params: { aceptar }
    });
}

export default { guardarPrestamo, obtenerTodosLosPrestamos, obtenerPrestamoPorId, eliminarPrestamo, obtenerPrestamoPorSolicitudId, responderPrestamo };