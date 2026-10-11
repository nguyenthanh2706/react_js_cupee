<template>
    <section class="py-16 px-4 bg-white">
        <div class="layout-content mx-auto">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{{ $t('introduceCompany.trends.title') }}</h2>
                <p class="text-[#a89480] text-sm md:text-base">{{ $t('introduceCompany.trends.subtitle') }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    v-for="(product, index) in products"
                    :key="index"
                    class="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 max-h-[250px]"
                >
                    <div class="shadow-box relative overflow-hidden group">
                        <img :src="product.image" :alt="product.name" class="w-full h-full max-h-[250px] object-cover group-hover:scale-105 transition-transform duration-500" />

                        <div class="absolute inset-0 bg-gradient-to-t from-[#a38d78] via-transparent to-transparent opacity-90"></div>

                        <div class="absolute bottom-[20px] left-4 text-white font-medium drop-shadow-lg">
                            {{ product.creator }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Product {
    name: string;
    price: string;
    image: string;
    creator: string;
    hasVideo?: boolean;
}

const products = ref<Product[]>([
    {
        name: 'Tách trà Sakura',
        price: 'đ120.000',
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop',
        creator: '@minale',
        hasVideo: false
    },
    {
        name: 'Tách trà sweetie',
        price: 'đ210.000',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
        creator: '@nhinquyen',
        hasVideo: false
    },
    {
        name: 'Đĩa Hương Trà',
        price: 'đ145.000',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop',
        creator: '@mocnhien_tran',
        hasVideo: true
    }
]);

const playVideo = (product: Product) => {
    console.log('[v0] Playing video for:', product.name);
};
</script>
<style>
.shadow-box {
    z-index: 1;
    border-radius: 8px;
    background: linear-gradient(to top, #dd8437 0%, #d2c4b6 50%, white 100%);
}
</style>
