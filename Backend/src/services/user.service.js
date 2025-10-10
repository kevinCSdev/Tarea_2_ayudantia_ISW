import { AppDataSource } from "../config/configDb.js";
import { User } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    password: hashedPassword,
  });

  return await userRepository.save(newUser);
}

export async function findUserByEmail(email) {
  return await userRepository.findOneBy({ email });
}

//Modficar perfil
export async function updateUserById(userId, updateData) {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    return null;
  }

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  Object.assign(user, updateData);

  return await userRepository.save(user);
}

//Eliminar perfil
export async function deleteUserById(userId) {
  const user = await userRepository.findOneBy({ id: userId });
  
  if (!user) {
    return false;
  }
  
  const result = await userRepository.delete(user.id);
  
  return result.affected > 0;
}