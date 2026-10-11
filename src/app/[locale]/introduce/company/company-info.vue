<template>
    <div class="min-h-screen">
        <div>
            <introduce-company-info-hero-section :isLoading="companyData.isLoading" :mediaItems="formattedCompanies?.media ?? []" />

            <introduce-company-info-mission-vision :missionVision="mapMissionVision" />

            <introduce-company-info-featured-products :isLoading="companyData.isLoading" :featuredProducts="formattedCompanies?.featuredProducts ?? []" />

            <introduce-company-info-cupee-features-alternative />

            <introduce-company-info-testimonial-slideshow :isLoading="companyData.isLoading" :testimonials="formattedCompanies?.reviews ?? []" />

            <introduce-company-info-social-media-trends />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAsyncData, useNuxtApp } from 'nuxt/app';
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import { useIntroduce } from '~/composables/use-introduce';
import { CompanyDataInfo, Icompany } from '~/interfaces/introduce/company';

definePageMeta({
    layout: 'app-layout'
});

const { t, locale } = useI18n();
const { $showMessage } = useNuxtApp();
const companyData: Icompany = reactive({
    isLoading: false,
    companies: null
});

const { data, status, error, refresh, pending } = await useAsyncData<{ companies: CompanyDataInfo[] }>('introduce-companyInfo', async () => {
    const params = `lang=${locale.value}`;
    const { data } = await useIntroduce(t, $showMessage).listCompany(params);
    return {
        companies: data?.data ?? []
    };
});

const formattedCompanies = computed<CompanyDataInfo | null>(() => {
    const data = companyData.companies;

    if (!data) return null;

    return {
        code: data.code || '',
        reviews: data.reviews || [],
        media: data?.media || [],
        featuredProducts: data.featuredProducts || [],
        mission: data.mission || '',
        vision: data.vision || ''
    };
});
const mapMissionVision = computed<{ mission: string; vision: string }>(() => {
    const data = formattedCompanies.value;
    return {
        mission: data?.mission || '',
        vision: data?.vision || ''
    };
});
watchEffect(() => {
    companyData.isLoading = pending.value;

    if (data.value) {
        companyData.companies = data.value.companies[0];
    }
});
</script>
