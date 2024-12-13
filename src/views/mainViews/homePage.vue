<template>
  <main>
    <bannerComponent />
    <featuresComponent />
    <bannerMPComponent />
    <div v-for="(category, index) in categories" :key="index">
      <productsSection :categoryId="category.id_categoria.toString()" :title="category.nombre" />
    </div>

  </main>
</template>

<script>
import bannerComponent from '../../components/homeComponents/bannerComponent.vue';
import featuresComponent from '../../components/homeComponents/featuresComponent.vue';
import bannerMPComponent from '../../components/homeComponents/bannerMPComponent.vue';
import productsSection from '../../components/homeComponents/sectionComponent.vue';
import { fetchCategoryData } from '../../utils/apiUtils';
export default {
  name: "HomePage",
  components: {
    bannerComponent,
    featuresComponent,
    bannerMPComponent,
    productsSection,
  },
  data() {
    return {
      categories: []
    }
  },
  async created() {
    this.$store.dispatch('loader/setLoading', true);
    try {
      this.categories = await fetchCategoryData();
    } catch (error) {
      console.log(error)
    } finally {
      this.$store.dispatch('loader/setLoading', false);
    }
  }
};
</script>
