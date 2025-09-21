import { handleSuccess, handleErrorServer, handleErrorClient} from "../Handlers/responseHandlers.js";
import { updateUserById } from "../services/user.service.js";
import { deleteUserById } from "../services/user.service.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

//Modificar el perfil
export async function updatePrivateProfile(req, res) {
  try {
    const { email, password } = req.body;
    const userIdFromToken = req.userId; //Token del usuario

    //Validación
    if (!email && !password) {
      return handleError(res, 400, "Debe proporcionar un email o una contraseña para actualizar.");
    }
    
    //Actualizar el usuario
    const updatedUser = await updateUserById(userIdFromToken, { email, password });

    if (!updatedUser) {
      return handleErrorClient(res, 404, "Usuario no encontrado.");
    }

    handleSuccess(res, 200, "Perfil actualizado correctamente", { user: updatedUser });

  } catch (error) {
    handleErrorServer(res, 500, "Error al actualizar el perfil.", error);
  }
}

//Eliminar perfil
export async function deletePrivateProfile(req, res) {
  try {
    const userIdFromToken = req.userId;

    const isDeleted = await deleteUserById(userIdFromToken);

    if (!isDeleted) {
      return handleErrorClient(res, 404, "Usuario no encontrado o ya ha sido eliminado.");
    }

    handleSuccess(res, 200, "Perfil eliminado exitosamente.");
    
  } catch (error) {
    handleErrorServer(res, 500, "Error al eliminar el perfil.", error);
  }
}