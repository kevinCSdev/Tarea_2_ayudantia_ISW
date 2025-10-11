import { useState, useEffect} from "react";
import { getProfile } from "../services/profile.service.js";

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [passwordToShow, setPasswordToShow] = useState('');

  useEffect(() => {
  const token = sessionStorage.getItem("jwt-auth");
  if (!token) {
    navigate("/login"); // Redirige si no hay token
  }
}, []);


  const handleGetProfile = async () => {
    try {
      //Leer la contraseña 
      const pwd = sessionStorage.getItem("usuario-password") || '';
      setPasswordToShow(pwd);

      //Llamada del backend
      const response = await getProfile();

      //Extraer los datos
      if (response.data && response.data.userData) {
        setProfileData(response.data.userData);
      } else if (response.message) {
        setProfileData({ message: response.message });
      } else {
        setProfileData({ message: "Error al obtener perfil" });
      }
    } catch (error) {
      setProfileData({ message: "Error al conectar con el servidor" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Página de Inicio
        </h1>

        <button
          onClick={handleGetProfile}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Obtener Perfil
        </button>

        {profileData && (
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            {/* Mostrar datos del usuario */}
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Contraseña (solo testing):</strong> {passwordToShow}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
