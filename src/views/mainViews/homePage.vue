<template>
  <main>
    <bannerComponent />
    <featuresComponent />
    <bannerMPComponent />
    <productsSection :title="'Alimentos y Bebidas'" />
    <productsSectionColumn2 :title="'Cuidado Personal'" :titleProductSpecial="'Special Product'" />
    <productsSection :title="'Hogar y Decoración'" />
    <productsSectionColumn :title="'Tecnología e Innovación'" :titleProductSpecial="'Special Product'" />
    <productsSection :title="'Papelería y Oficina'" />
  </main>
</template>

<script>
import bannerComponent from '../../components/homeComponents/bannerComponent.vue';
import featuresComponent from '../../components/homeComponents/featuresComponent.vue';
import bannerMPComponent from '../../components/homeComponents/bannerMPComponent.vue';
import productsSection from '../../components/homeComponents/sectionComponent.vue';
import productsSectionColumn from '../../components/homeComponents/sectionColumnComponent1.vue';
import productsSectionColumn2 from '../../components/homeComponents/sectionColumnComponent2.vue';
export default {
  name: "HomePage",
  components: {
    bannerComponent,
    featuresComponent,
    bannerMPComponent,
    productsSection,
    productsSectionColumn,
    productsSectionColumn2
  },
};
</script>

<style scoped></style>
