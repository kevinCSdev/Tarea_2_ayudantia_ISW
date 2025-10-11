import axios from './root.service.js';

export async function login(dataUser) {
  try {
    const { email, password } = dataUser;
    const response = await axios.post("/auth/login", { email, password });

    //token y user dentro de response.data.data
    const { token, user } = response.data.data;

    sessionStorage.setItem("jwt-auth", token);
    sessionStorage.setItem("usuario", JSON.stringify(user));

    // SOLO PARA TEST: guardar la contraseña introducida en sessionStorage
    sessionStorage.setItem('usuario-password', password);

    return response.data;
  } catch (error) {
    return error.response?.data || { message: "Error al conectar con el servidor" };
  }
}


export async function register(data) {
    try {
        const { email, password } = data;
        const response = await axios.post('/auth/register', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al conectar con el servidor' };
    }
}

export async function logout() {
    try {
        sessionStorage.removeItem('usuario');
        cookies.remove('jwt-auth');
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}
