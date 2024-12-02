import apiClient from '../store/auth-vuex.js';

export async function fetchUserData() {
  const userData = sessionStorage.getItem('userData');

  if(userData) {
    //Si ya existen se retorna el json con los datos
    return JSON.parse(userData);
  }
  //Si no existen se hace una llamada a la API
  const response = await apiClient.get('/users/me');
  sessionStorage.setItem('userData', JSON.stringify(response.data));  
  return response.data;
}

export async function fetchAllUsersData() {
  const response = await apiClient.get('/users')
  return response.data;
}

export async function fetchCategoryData() {
  const response = await apiClient.get("/categories");
  // localStorage.setItem('categoryData', JSON.stringify(response.data.categories)); 
  return response.data.categories;
}

export async function fetchCategoryById(categoryId) {
  if (!categoryId) {
    throw new Error('Se requiere un ID de categoría válido');
  }

  const response = await apiClient.get(`/categories/${categoryId}`);
  return response.data;
}


export async function fetchSizes(sizeId='') {
  // Hacer la petición a la API para obtener las sizes
  if(sizeId==='') {
    const response = await apiClient.get('/sizes');
    return response.data.sizes;
  }else {
    const response = await apiClient.get(`/sizes/${sizeId}`);
    return response.data
  }
}

export async function fetchColors(colorId='') {
  // Hacer la petición a la API para obtener los colores
  if(colorId==='') {
    const response = await apiClient.get('/colors');
    return response.data.colors;
  }else {
    const response = await apiClient.get(`/colors/${colorId}`);
    return response.data
  }
}
