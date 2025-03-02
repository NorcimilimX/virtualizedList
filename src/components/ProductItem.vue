<template>
  <div class="product">
    <div class="product__image-section">
      <img :src="product.thumbnail" :alt="product.title"/>
    </div>
    <div class="product__details-section">
      <h3 class="product__details-section__title">{{ product.title }}</h3>
      <p class="product__details-section__desc">{{ product.description }}</p>
      <div class="product__details-section__brand-discount">
        <p class="product__details-section__brand-discount__brand">{{ product.brand ? product.brand : 'No brand' }}</p>
        <p class="product__details-section__brand-discount__discount">{{ product.discount ? product.discount + ' %' : 'No discount %' }}</p>
      </div>
      <div class="product__details-section__price-rating-category">
        <p class="product__details-section__price-rating-category__price">{{ '$ ' + product.price }}</p>
        <p class="product__details-section__price-rating-category__rating">{{ '⭐️ ' + product.rating }}</p>
        <p class="product__details-section__price-rating-category__category">{{ product.category }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number
  title: string
  description: string
  thumbnail: string
  discount: number
  price: number
  rating: number
  category: string
  brand: string
}

defineProps<{ product: Product }>();
</script>