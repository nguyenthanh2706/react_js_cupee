<template>
    <section class="py-16 bg-white">
        <div class="layout-content mx-auto">
            <div class="text-center mb-12">
                <h2 class="text-2xl md:text-3xl font-bold text-[#000000] mb-3 uppercase tracking-wide">{{ $t('introduceCompany.features.title') }}</h2>
                <p class="text-[#a38d78] text-sm md:text-base">{{ $t('introduceCompany.features.subtitle') }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div v-for="(feature, index) in features" :key="feature.id">
                    <div class="flex flex-col items-center justify-items-center text-center">
                        <div class="w-16 h-16 mb-3 grid place-items-center">
                            <img :src="feature.icon" alt="" class="object-contain" />
                        </div>
                        <p class="font-bold text-[18px] text-black/80 pb-4">{{ feature.title }}</p>
                        <p class="text-[#000000CC] max-w-[250px]">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import feature1 from '@/public/images/introduce/company/features_1.png';
import feature2 from '@/public/images/introduce/company/features_2.png';
import feature3 from '@/public/images/introduce/company/features_3.png';
import feature4 from '@/public/images/introduce/company/features_4.png';
const { t } = useI18n();

interface Feature {
    id: number;
    icon: string;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        id: 1,
        icon: feature1,
        title: t('introduceCompany.features.items.quality.title'),
        description: t('introduceCompany.features.items.quality.desc')
    },
    {
        id: 2,
        icon: feature2,
        title: t('introduceCompany.features.items.variety.title'),
        description: t('introduceCompany.features.items.variety.desc')
    },
    {
        id: 3,
        icon: feature3,
        title: t('introduceCompany.features.items.easy.title'),
        description: t('introduceCompany.features.items.easy.desc')
    },
    {
        id: 4,
        icon: feature4,
        title: t('introduceCompany.features.items.service.title'),
        description: t('introduceCompany.features.items.service.desc')
    }
];
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.8s ease-out;
}

.group:hover .group-hover\:opacity-100 {
    opacity: 1;
}
</style>
