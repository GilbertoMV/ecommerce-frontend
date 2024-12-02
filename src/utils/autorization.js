import {jwtDecode} from 'jwt-decode';

export function validation() {
  const token = sessionStorage.getItem('token');
  
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      
      if (decodedToken && decodedToken.cuenta) {
        return decodedToken.cuenta;
      } else {
        console.error("El token no contiene la propiedad accountType");
        return null; 
      }
      
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  } else {
    console.error("No se encontró un token en sessionStorage");
    return null;
  }
}
