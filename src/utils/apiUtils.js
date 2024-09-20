import apiClient from '../store/auth-vuex.js';

export async function fetchCategoryData() {
  // Intentar obtener los datos almacenados en localStorage
  const categoryData = localStorage.getItem('categoryData');

  if (categoryData) {
    // Si existen datos en localStorage, convertirlos de vuelta a objeto/array
    return JSON.parse(categoryData);
  }

  // Hacer la petición a la API para obtener las categorías
  const response = await apiClient.get("/categories");
  const categories = response.data;

  // Almacenar los datos como string en localStorage
  localStorage.setItem('categoryData', JSON.stringify(categories));

  return categories;
}

export async function fetchUserData() {
  //Intentamos obtener los datos del usuario desde el session storage
  const userData = sessionStorage.getItem('userData');

  if(userData) {
    //Si ya existen se retorna el json con los datos
    return JSON.parse(userData);
  }
  //Si no existen se hace una llamada a la API
  const response = await apiClient.get('/users/me');
  //Se almacenan en el session storage
  sessionStorage.setItem('userData', JSON.stringify(response.data));  
  return response.data;
}
