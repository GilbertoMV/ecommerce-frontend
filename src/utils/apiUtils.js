import Swal from 'sweetalert2';
import apiClient from '../store/auth-vuex.js';
//CONSTANTES DE STORAGE
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;
const CATEGORIES_KEY = 'categoriesData';

function isLoggedIn() {
  return !!sessionStorage.getItem('token')
}
//UTILS PARA CLIENTE

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

export async function fetchProductsByCategories(categoryId, limit='') {
  const products = await apiClient.get(`products/category/${categoryId}?limit=${limit}`);
  return products.data.products;
}

export async function addToCart(productId, userId, price) {

  if(!isLoggedIn()) {
    Swal.fire({
      icon: "error",
      text: 'Login to add to shopping car',
      toast: true,
      width: 'auto',
      position: "bottom-right",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  return;
  }
  const date = new Date()
  try {
    const response = await apiClient.get(`/carts/me/${userId}`);
    const cart = response.data;

    if(cart.length === 0) {
      //se crea el carrito
      const createCart = await apiClient.post(`/carts/`, {
        id_usuario: userId,
        fecha_creacion: date,
        estado: 'Activo'
      });
      //se anade el producto al carrito
      await apiClient.post(`/carts/details`, {
        id_carrito: createCart.data.id,
        id_producto: productId,
        cantidad: 1,
        precio: price,
        descuento: 0,
      });
    }else {
      //se anade el producto al carrito
      await apiClient.post(`/carts/details`, {
        id_carrito: cart[0].id_carrito,
        id_producto: productId,
        cantidad: 1,
        precio: price,
        descuento: 0,
      });
    }
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
  }
}
//UTILS PARA ADMINISTRADOR

export async function fetchAllUsersData() {
  const response = await apiClient.get('/users')
  return response.data;
}

export async function fetchCategoryById(categoryId) {
  if (!categoryId) {
    throw new Error('Se requiere un ID de categoría válido');
  }

  const response = await apiClient.get(`/categories/${categoryId}`);
  return response.data;
}

//UTILS COMPARTIDAS CLIENTE/ADMINISTRADOR
export async function fetchCategoryData() {
  const storedData = JSON.parse(localStorage.getItem(CATEGORIES_KEY));
  const now = new Date().getTime();

  if (storedData && (now - storedData.lastUpdated < EXPIRATION_TIME)) {
    return storedData.data;
  }

  try {
    const response = await apiClient.get("/categories");
    const categories = response.data.categories;

    localStorage.setItem(CATEGORIES_KEY, JSON.stringify({
      data: categories,
      lastUpdated: now
    }));

    return categories;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
}

export async function fetchSizes(sizeId='') {
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
