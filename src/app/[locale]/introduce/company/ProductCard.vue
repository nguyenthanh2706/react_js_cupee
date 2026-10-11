<template>
    <div class="flex-shrink-0 w-[262px] bg-[#faf9f5] rounded-md shadow-sm hover:border-[#b26158] transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 flex flex-col">
        <div class="relative h-[260px] bg-gray-50 overflow-hidden">
            <img
                v-if="product.images"
                :src="product.images"
                :alt="product.name"
                class="!w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                @click="$emit('view-details', product.code)"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <i class="pi pi-image text-5xl"></i>
            </div>

            <button
                @click.stop="$emit('toggle-wishlist', product.code)"
                class="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-1"
            >
                <i :class="['pi text-lg', product.isWishlisted ? 'pi-heart-fill text-red-500' : 'pi-heart text-gray-400']"></i>
            </button>

            <div v-if="product.discount" class="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-{{ product.discount }}%</div>
        </div>

        <div class="p-4 flex-1 flex flex-col">
            <h3 class="font-semibold text-[#333332] text-base mb-2 cursor-pointer" @click="$emit('view-details', product.code)">
                {{ product.name }}
            </h3>

            <div class="flex items-center gap-2 mb-2">
                <span class="text-[#b26158] font-bold text-base"> đ{{ formatCurrency(product.priceDisplay) }} </span>
                <span v-if="product.originalPrice && product.discount" class="text-[#a0a0a0] line-through text-xs"> đ{{ formatCurrency(product.originalPrice) }} </span>
            </div>

            <p class="text-xs text-[#a0a0a0] mb-3 line-clamp-2">{{ $t('introduce.company.freeCustomDesign') }}</p>

            <div class="flex items-center gap-[10px] mb-3 text-xs">
                <span class="flex items-center border-1 p-[2px] border-[#a38d78] gap-1 text-gray-600"
                    ><i class="pi pi-star-fill text-yellow-400" style="font-size: 0.5rem"></i>{{ product.rating || 5 }}</span
                >
                <span class="text-[#464544]"> {{ $t('introduce.company.sold', { sold: formatSold(product.sold || 0) }) }}</span>
            </div>

            <div v-if="product.colors && product.colors.length > 0" class="flex gap-2 mb-3">
                <button
                    v-for="(color, index) in product.colors.slice(0, 5)"
                    :key="index"
                    class="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-600 transition-colors"
                    :style="{ backgroundColor: color }"
                    :title="color"
                ></button>
            </div>

            <!-- <div class="flex gap-2">
                <button
                    @click.stop="$emit('customize', product)"
                    class="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#B4967C] text-white rounded-lg hover:bg-[#9d7e67] transition-colors font-medium text-sm"
                >
                    <i class="pi pi-palette text-sm"></i>
                    <span>Tùy chỉnh</span>
                </button>

                <button
                    @click.stop="$emit('add-to-cart', product)"
                    class="flex items-center justify-center px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <i class="pi pi-shopping-cart text-sm"></i>
                </button>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
interface Product {
    code: string;
    name: string;
    images: string;
    priceDisplay: string;
    originalPrice?: string;
    discount?: number;
    colors?: string[];
    rating?: number;
    sold?: number;
    isWishlisted?: boolean;
}
const { locale, t } = useI18n();
interface Props {
    product: Product;
}

defineProps<Props>();

defineEmits<{
    'view-details': [code: string];
    'add-to-cart': [product: Product];
    customize: [product: Product];
    'toggle-wishlist': [code: string];
}>();
const formatCurrency = (value: any) => {
    const number = Number(value);
    if (!number || isNaN(number)) return '0';
    return locale.value === 'vi' ? number.toLocaleString('vi-VN') : number.toLocaleString('en-GB');
};

const formatSold = (sold: number): string => {
    if (sold >= 1000) {
        return (sold / 1000).toFixed(1) + 'k';
    }
    return sold.toString();
};
</script>
