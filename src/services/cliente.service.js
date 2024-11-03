import httpClient from "../http-common";

const obtenerClientes = () => {
  return httpClient.get("/clientes/")
}

const registrarCliente = (cliente) => {
  return httpClient.post("/clientes/registrarse", cliente)
}

const login = (rut, password) => {
  return httpClient.post("/clientes/login", null, {
      params: { rut, password }
  })
}

const logout = () => {
  return httpClient.post("/clientes/logout")
}

const simularCredito = (tipoPrestamo, valorPropiedad, montoPrestamo, plazo, tasaInteresAnual) => {
  return httpClient.post("/clientes/simular-credito", null, {
      params: { tipoPrestamo, valorPropiedad, montoPrestamo, plazo, tasaInteresAnual }
  })
}


export default { obtenerClientes, registrarCliente, login, logout, simularCredito };