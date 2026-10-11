<template>
    <section class="bg-[#f4f1ea] py-16 px-4">
        <div class="layout-content mx-auto">
            <div class="text-center mb-12">
                <h2 class="text-2xl md:text-3xl font-bold text-[#000000] mb-3 uppercase tracking-wide">{{ $t('introduceCompany.testimonials.title') }}</h2>
                <p class="text-[#a38d78] text-sm md:text-base">{{ $t('introduceCompany.testimonials.subtitle') }}</p>
            </div>

            <div class="relative">
                <div class="overflow-hidden">
                    <div class="flex transition-transform duration-500 ease-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                        <div v-for="(group, groupIndex) in testimonialGroups" :key="groupIndex" class="w-full flex-shrink-0">
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4">
                                <div v-for="testimonial in group" :key="testimonial.code" class="relative flex overflow-hidden transition-shadow duration-300">
                                    <div class="mt-[50px] px-6 bg-white rounded-4xl max-w-[70%]">
                                        <div class="relative top-[-30px] flex flex-col justify-center items-center">
                                            <div class="relative">
                                                <img :src="testimonial.avatar" :alt="testimonial.name" class="w-20 h-20 rounded-full object-cover border-6 border-[white]" />
                                            </div>
                                            <h3 class="font-semibold text-[#000000] text-base">
                                                {{ testimonial.name }}
                                            </h3>

                                            <div class="flex justify-center mb-4 text-base">
                                                <i v-for="star in 5" :key="star" class="text-red-500">★</i>
                                            </div>

                                            <p class="text-gray-700 text-base leading-relaxed">
                                                {{ testimonial.content }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="absolute top-0 right-0 max-w-[100%] rounded-tl-[50px] rounded-br-[50px] h-48 bg-gray-100" style="z-index: -1">
                                        <img :src="testimonial.productImage" :alt="testimonial.name" class="max-w-[100%] w-full h-full rounded-tl-[50px] rounded-br-[50px] object-cover" />

                                        <button
                                            v-if="testimonial.hasVideo"
                                            @click="playVideo(testimonial.code)"
                                            class="absolute inset-0 flex items-center justify-center rounded-tl-[50px] rounded-br-[50px] bg-black bg-opacity-20 hover:bg-opacity-30 transition-all group"
                                        >
                                            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <svg class="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Progress Dots -->
            <div class="flex justify-center gap-3 mt-8">
                <button
                    v-for="(group, index) in testimonialGroups"
                    :key="index"
                    @click="goToSlide(index)"
                    :class="['h-2 rounded-full transition-all duration-300', currentIndex === index ? 'w-8 bg-gray-800' : 'w-2 bg-gray-400 hover:bg-gray-600']"
                ></button>

                <button
                    @click="prevSlide"
                    :disabled="currentIndex === 0"
                    :class="[
                        '-translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all z-1 hover:cursor-pointer',
                        currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                    ]"
                >
                    <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    @click="nextSlide"
                    :disabled="currentIndex === testimonialGroups.length - 1"
                    :class="[
                        '-translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all z-1 hover:cursor-pointer',
                        currentIndex === testimonialGroups.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                    ]"
                >
                    <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Testimonial {
    name: string;
    code: string;
    content: string;
    avatar: string;
    productImage: string;
    hasVideo: boolean;
}
const props = defineProps<{
    isLoading: boolean;
    testimonials: Testimonial;
}>();

const mapReviews = (data: unknown): Testimonial[] => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
        code: item.code || '',
        name: item.customer_name || '',
        content: item.content || '',
        avatar: item.image?.path_image_original || '',
        hasVideo: false,
        productImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop'
    }));
};
const testimonials = computed<Testimonial[]>(() => mapReviews(props.testimonials));

const currentIndex = ref(0);
const itemsPerSlide = ref(3);
let autoplayInterval: NodeJS.Timeout | null = null;

const testimonialGroups = computed(() => {
    const groups: Testimonial[][] = [];
    for (let i = 0; i < testimonials.value.length; i += itemsPerSlide.value) {
        groups.push(testimonials.value.slice(i, i + itemsPerSlide.value));
    }
    return groups;
});

// Navigation methods
const nextSlide = () => {
    if (currentIndex.value < testimonialGroups.value.length - 1) {
        currentIndex.value++;
    }
};

const prevSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    }
};

const goToSlide = (index: number) => {
    currentIndex.value = index;
};

const playVideo = (id: string) => {
    console.log(`Playing video for testimonial ${id}`);
};
</script>
