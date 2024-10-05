import {jwtDecode} from 'jwt-decode'; // Importación sin las llaves

export function validation() {
  const token = localStorage.getItem('token');
  
  // Verificar si hay un token
  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decodificar token
      
      if (decodedToken && decodedToken.cuenta) {
        return decodedToken.cuenta; // Retornar el tipo de cuenta si existe
      } else {
        console.error("El token no contiene la propiedad accountType");
        return null; // Retorna null si no existe accountType
      }
      
    } catch (error) {
      console.error("Error al decodificar el token:", error); // Si el token es inválido o no se puede decodificar
      return null;
    }
  } else {
    console.error("No se encontró un token en localStorage");
    return null; // No hay token en el localStorage
  }
}
