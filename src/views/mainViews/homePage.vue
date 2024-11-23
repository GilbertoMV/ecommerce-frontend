<template>
  <main>
    <bannerComponent />
    <featuresComponent />
    <bannerMPComponent />
    <!-- Una posible feature puede ser que por cada categoria existente, traiga dinamicamente los productos -->
    <productsSection :link="'6'" :title="'Alimentos y Bebidas'" />
    <productsSection :link="'7'" :title="'Moda y Textiles'" />
    <productsSection :link="'8'" :title="'Tecnología'" />
    <productsSection :link="'9'" :title="'Cuidado Personal'" />
    <productsSection :link="'10'" :title="'Hogar y Decoración'" />
    <productsSection :link="'11'" :title="'Juegos y Juguetes'" />
    <productsSection :link="'12'" :title="'Oficina y Papelería'" />
    <productsSection :link="'13'" :title="'Jardinería'" />
    <productsSection :link="'14'" :title="'Libros'" />
    <productsSection :link="'15'" :title="'Autopartes'" />
  </main>
</template>

<script>
import bannerComponent from '../../components/homeComponents/bannerComponent.vue';
import featuresComponent from '../../components/homeComponents/featuresComponent.vue';
import bannerMPComponent from '../../components/homeComponents/bannerMPComponent.vue';
import productsSection from '../../components/homeComponents/sectionComponent.vue';
export default {
  name: "HomePage",
  components: {
    bannerComponent,
    featuresComponent,
    bannerMPComponent,
    productsSection,
  },
};
</script>
