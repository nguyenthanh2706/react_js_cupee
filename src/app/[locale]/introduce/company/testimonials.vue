<template>
    <section class="mb-12">
        <div class="card !mb-0">
            <h2 class="text-2xl font-bold text-gray-900">{{ t('introduce.company.productReviews') }}</h2>
        </div>

        <div v-if="props.isLoading" class="text-gray-500 card">dang tai du lieu...</div>
        <div v-else-if="mockTestimonials.length === 0" class="text-gray-500 card">Khong co du lieu</div>
        <div v-else class="p-6">
            <div
                class="grid gap-10 items-stretch"
                :class="{
                    'md:grid-cols-4': mockTestimonials.length >= 4,
                    'md:grid-cols-3': mockTestimonials.length === 3,
                    'md:grid-cols-2': mockTestimonials.length === 2
                }"
            >
                <div
                    v-for="(testimonial, index) in mockTestimonials"
                    :key="testimonial.code"
                    class="card !mb-0 cursor-pointer"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    @mouseenter="pauseAnimation(index)"
                    @mouseleave="resumeAnimation(index)"
                >
                    <div class="p-4">
                        <div class="grid grid-cols-2 gap-4 items-center min-h-[180px]">
                            <div class="bg-yellow-50 h-full flex flex-col justify-between p-4">
                                <div class="w-full flex justify-center mb-4">
                                    <div class="w-40 h-40 bg-yellow-200 rounded-full overflow-hidden">
                                        <img :src="testimonial.avatar" :alt="testimonial.name" class="w-full h-full object-contain hover:scale-110 transition-transform duration-300" />
                                    </div>
                                </div>

                                <div class="flex justify-center mb-3">
                                    <div class="flex space-x-1">
                                        <i v-for="star in 5" :key="star" class="pi pi-star-fill text-yellow-400 text-gray-300"></i>
                                    </div>
                                </div>

                                <div class="text-center font-medium">
                                    <h4>{{ testimonial.name }}</h4>
                                </div>
                            </div>

                            <div class="text-base text-gray-700 leading-relaxed">"{{ testimonial.content }}"</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Testimonial } from '~/interfaces/introduce/company';

const { t } = useI18n();

const animationPaused = ref<boolean[]>([]);

interface Review {
    name: string;
    code: string;
    content: string;
    avatar: string;
}

const props = defineProps<{
    isLoading: boolean;
    testimonials: Testimonial;
}>();

const mapReviews = (data: unknown): Review[] => {
    if (!Array.isArray(data)) return [];
    return data.map((item) => ({
        code: item.code || '',
        name: item.customer_name || '',
        content: item.content || '',
        avatar: item.image?.path_image_original || ''
    }));
};

const mockTestimonials = computed<Review[]>(() => mapReviews(props.testimonials));

const pauseAnimation = (index: number): void => {
    animationPaused.value[index] = true;
};

const resumeAnimation = (index: number): void => {
    animationPaused.value[index] = false;
};
</script>

<style scoped>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes pulse {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.animate-pulse-slow {
    animation: pulse 2s infinite;
}
</style>
