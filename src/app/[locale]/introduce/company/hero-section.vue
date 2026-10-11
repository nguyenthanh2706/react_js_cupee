<template>
    <section class="relative">
        <div class="overflow-hidden">
            <Carousel
                :value="SectionList.items"
                :numVisible="1"
                :numScroll="1"
                circular
                :autoplayInterval="6000"
                :showIndicators="true"
                :showNavigators="false"
                @mouseenter="pauseAutoSlide"
                @mouseleave="resumeAutoSlide"
            >
                <template #item="slotProps">
                    <div class="aspect-[21/9] overflow-hidden relative bg-gray-200 w-full h-[517px]">
                        <div v-if="slotProps.data.type === 'image'" class="w-full max-h-[517px]">
                            <img :src="slotProps.data.image_url" :alt="slotProps.data.code" class="w-full max-hh-[517px] object-cover" />
                        </div>
                        <div v-else-if="slotProps.data.type === 'video'" class="w-full h-[517px]">
                            <video :src="slotProps.data.image_url" :poster="slotProps.data.image_url || slotProps.data.poster" controls class="w-full h-[517px] object-cover">
                                {{ $t('introduceCompany.hero.videoNotSupported') }}
                            </video>
                        </div>
                    </div>
                </template>
            </Carousel>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import { MediaItem } from '~/interfaces/introduce/company';
import Carousel from 'primevue/carousel';

interface sectionList {
    isLoading: boolean;
    items: any[];
}

const props = defineProps<{
    isLoading: boolean;
    mediaItems: MediaItem[];
}>();

const isAutoPlaying = ref(true);
const autoSlideInterval = ref<NodeJS.Timeout | null>(null);

const mapSectionData = (data: any[] | null): { image_url: string; code: string; type: string }[] => {
    return (data || []).map((item) => ({
        code: item.code ?? '',
        image_url: item.image_url ?? '',
        type: item.type ?? ''
    }));
};

const SectionList: sectionList = reactive({
    isLoading: props.isLoading,
    items: mapSectionData(props.mediaItems)
});

const toggleAutoSlide = (): void => {
    if (isAutoPlaying.value) {
        pauseAutoSlide();
    } else {
        resumeAutoSlide();
    }
};

const stopAutoSlide = (): void => {
    if (autoSlideInterval.value) {
        clearInterval(autoSlideInterval.value);
        autoSlideInterval.value = null;
    }
};

const pauseAutoSlide = (): void => {
    stopAutoSlide();
    isAutoPlaying.value = false;
};

const resumeAutoSlide = (): void => {
    if (!autoSlideInterval.value) {
        isAutoPlaying.value = true;
    }
};

onUnmounted(() => {
    stopAutoSlide();
});
</script>

<style scoped>
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
    background-color: rgba(0, 0, 0, 0.7);
    transform: scale(1.2);
}
</style>
