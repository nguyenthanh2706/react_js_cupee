<template>
    <section class="py-16">
        <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-[#2C2C2C] mb-3 uppercase tracking-wide">
                {{ t('introduceCompany.featuredProducts.title') }}
            </h2>
            <p class="text-[#B4967C] text-base">{{ t('introduceCompany.featuredProducts.subtitle') }}</p>
        </div>

        <div class="relative mb-10 px-4">
            <ListCategory @update:category="changeSelectCategory" />
        </div>

        <div v-if="props.isLoading" class="text-center text-gray-500 py-12">
            <i class="pi pi-spin pi-spinner text-3xl mb-3"></i>
            <p>{{ t('text.loading') || 'Đang tải...' }}</p>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="text-center text-gray-500 py-12">
            <i class="pi pi-inbox text-4xl mb-3"></i>
            <p>{{ t('text.noData') || 'Không có sản phẩm' }}</p>
        </div>

        <div v-else class="relative px-4">
            <Carousel
                :value="filteredProducts"
                :numVisible="4"
                :numScroll="1"
                :responsiveOptions="responsiveOptions"
                :circular="true"
                :autoplayInterval="3000"
                containerClass="products-carousel"
                class="products-carousel-wrapper"
            >
                <template #item="slotProps">
                    <div class="flex justify-center h-full">
                        <ProductCard :product="slotProps.data" @view-details="changeRouterProduct" @toggle-wishlist="toggleWishlist" />
                    </div>
                </template>
            </Carousel>
        </div>

        <div class="mt-10 text-center">
            <button
                @click="viewAll"
                class="cursor-pointer px-12 py-3 border-2 border-[#2C2C2C] text-[#2C2C2C] rounded-full uppercase text-sm font-semibold hover:bg-[#2C2C2C] hover:text-white transition-all duration-300"
            >
                {{ t('customerInfo.showAll') }}
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { navigateTo } from 'nuxt/app';
import { useI18n } from 'vue-i18n';
import Carousel from 'primevue/carousel';
import ListCategory from './list/list-category.vue';
import ProductCard from './ProductCard.vue';

const { t } = useI18n();
const responsiveOptions = [
    {
        breakpoint: '1920px',
        numVisible: 6,
        numScroll: 1
    },
    {
        breakpoint: '1536px',
        numVisible: 5,
        numScroll: 1
    },
    {
        breakpoint: '1280px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '640px',
        numVisible: 1,
        numScroll: 1
    }
];

interface LocalProductCard {
    code: string;
    name: string;
    images: string;
    priceDisplay: string;
    originalPrice?: string;
    discount?: number;
    category_code?: string | null;
    colors?: string[];
    rating?: number;
    sold?: number;
    isWishlisted?: boolean;
}

interface Props {
    isLoading: boolean;
    featuredProducts: any[];
}

const props = defineProps<Props>();
const selectedCategory = ref<string | null>(null);

const fomartDataProducts = computed<LocalProductCard[]>(() => {
    if (!props.featuredProducts || props.featuredProducts.length === 0) {
        return [];
    }
    return props.featuredProducts.map((product) => ({
        code: product.code,
        name: product.name || '',
        images: product.path_image_resize || '',
        priceDisplay: product.sale_price || product.price || '',
        originalPrice: product.price,
        discount: product.discount_percent,
        category_code: product.category_code || null,
        colors: product.colors || [],
        rating: product.rating || 5,
        sold: product.sold_count || 0,
        isWishlisted: product.is_wishlisted || false
    }));
});

const filteredProducts = computed<LocalProductCard[]>(() => {
    if (!selectedCategory.value) return fomartDataProducts.value;
    return fomartDataProducts.value.filter((p) => p.category_code === selectedCategory.value);
});

const changeSelectCategory = (value: any): void => {
    selectedCategory.value = value?.code ?? null;
};

const changeRouterProduct = (code: string): void => {
    navigateTo({ path: `/product/${code}` });
};

const toggleWishlist = (productCode: string): void => {
    const product = fomartDataProducts.value.find((p) => p.code === productCode);
    if (product) {
        product.isWishlisted = !product.isWishlisted;
    }
};

const viewAll = (): void => {
    navigateTo({ path: '/product/list' });
};
</script>
<style scoped>
.products-carousel-wrapper {
    overflow: visible !important;
}

:deep(.p-carousel-item) {
    display: flex !important;
    align-items: stretch !important;
}

:deep(.p-carousel-content) {
    display: flex !important;
    align-items: stretch !important;
}
:deep(.p-carousel-prev-button),
:deep(.p-carousel-next-button) {
    background-color: rgba(238, 238, 238, 0.9) !important;
    border-radius: 50% !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    transition: all 0.3s ease !important;
}

:deep(.p-carousel-prev-button:hover),
:deep(.p-carousel-next-button:hover) {
    background-color: rgba(255, 255, 255, 1) !important;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
}

:deep(.p-carousel-indicators) {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.75rem;
    padding: 0;
}

:deep(.p-carousel-indicator button) {
    background-color: rgba(0, 0, 0, 0.3);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
    border: none;
}

:deep(.p-carousel-indicator.p-highlight button) {
    background-color: rgba(0, 0, 0, 0.9);
    transform: scale(1.2);
}
:deep(.p-carousel-indicator-active) {
    background-color: black;
    border-radius: 50%;
}
</style>
