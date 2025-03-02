<template>
  <input v-model="searchQuery" placeholder="What are u searching for..." class="search-input"/>
  <transition-group name="fade">
    <ProductItem v-for="product in displayedProducts" :key="product.id" :product="product"/>
  </transition-group>
  <div ref="loadTrigger" class="load-trigger"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ProductItem from './ProductItem.vue';
import { useProducts } from '../composables/useProducts';

const { searchQuery, visibleProducts, filteredProducts, loadMore } = useProducts();
const loadTrigger = ref<HTMLElement | null>(null);

const displayedProducts = computed(() =>
    searchQuery.value ? filteredProducts.value : visibleProducts.value
);

onMounted(() => {
  if (loadTrigger.value) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    observer.observe(loadTrigger.value);
  }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.load-trigger {
  height: 20px;
}
</style>
