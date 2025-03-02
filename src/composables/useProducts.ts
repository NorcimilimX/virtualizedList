//here we`ll go with fetching data from api, product search, loading of new el while scrolling

import { ref, computed, onMounted } from 'vue';

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

export function useProducts() {
    const products = ref<Product[]>([]);
    const searchQuery = ref('');
    const visibleProducts = ref<Product[]>([]);
    const limit = 10;
    let currentIndex = limit;

    const fetchProducts = async () => {
        try {
            const res = await fetch('https://dummyjson.com/products?limit=100');
            const data = await res.json();
            products.value = data.products;
            visibleProducts.value = products.value.slice(0, limit);
        } catch (error) {
            console.error('Error while loading:', error);
        }
    };

    const filteredProducts = computed(() =>
        products.value.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    );

    const loadMore = () => {
        if (currentIndex < products.value.length) {
            visibleProducts.value.push(...products.value.slice(currentIndex, currentIndex + limit));
            currentIndex += limit;
        }
    };

    onMounted(fetchProducts);

    return { searchQuery, visibleProducts, filteredProducts, loadMore };
}
