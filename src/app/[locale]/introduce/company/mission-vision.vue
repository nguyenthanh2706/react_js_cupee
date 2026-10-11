<template>
    <section class="py-20 bg-[#ffffff]">
        <div class="mx-auto layout-content relative mt-[40px]">
            <span class="absolute top-[-140px] text-[120px] text-[#000000] rotate-[-9deg] origin-left block" style="font-family: 'SVN Harmony', sans-serif !important"
                >Gốm Việt , <br />
                Mỗi sản phẩm là, một câu chuyện của bạn</span
            >

            <div class="grid lg:grid-cols-2 gap-16 items-center mb-[53.5px]">
                <div class="space-y-6">
                    <div>
                        <h2 class="text-4xl font-bold text-[#2C2C2C] mb-4 tracking-tight">{{ $t('introduceCompany.missionVision.missionTitle') }}</h2>
                        <p class="text-[#B4967C] font-medium mb-8">{{ $t('introduceCompany.missionVision.missionSubtitle') }}</p>
                    </div>

                    <div class="space-y-5 text-[#000000] text-base leading-relaxed">
                        <p>{{ $t('introduceCompany.missionVision.missionParagraph1') }}</p>
                        <p>{{ $t('introduceCompany.missionVision.missionParagraph2') }}</p>
                    </div>
                </div>

                <div class="relative h-[500px]">
                    <div class="absolute top-0 right-0 w-48 h-48 rounded-2xl overflow-hidden shadow-xl transform rotate-6">
                        <img src="https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop" alt="Ceramic cups" class="w-full h-full object-cover" />
                    </div>

                    <div class="absolute bottom-0 left-0 right-16 h-80 rounded-2xl overflow-hidden shadow-2xl transform -rotate-2">
                        <img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=500&fit=crop" alt="Yellow coffee cup with flowers" class="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div class="relative h-[450px] order-2 lg:order-1">
                    <div class="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=500&fit=crop" alt="Ceramic tea set with floral pattern" class="w-full h-full object-cover" />
                    </div>
                </div>

                <div class="space-y-6 order-1 lg:order-2">
                    <div>
                        <h2 class="text-4xl font-bold text-[#2C2C2C] mb-4 tracking-tight">{{ $t('introduceCompany.missionVision.visionTitle') }}</h2>
                        <p class="text-[#B4967C] font-medium mb-8">{{ $t('introduceCompany.missionVision.visionSubtitle') }}</p>
                    </div>

                    <div class="text-[#000000] text-base leading-relaxed">
                        <p>{{ $t('introduceCompany.missionVision.visionParagraph1') }}</p>
                    </div>
                    <span class="text-[60px] text-[#000000]" style="font-family: 'SVN Harmony', sans-serif !important"
                        >Trở thành thương hiệu gốm thủ công <br />
                        hàng đầu Việt Nam và Quốc Tế</span
                    >
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
interface Props {
    missionTitle?: string;
    missionSubtitle?: string;
    missionContent?: string[];
    visionTitle?: string;
    visionSubtitle?: string;
    visionContent?: string;
}

withDefaults(defineProps<Props>(), {
    missionTitle: '',
    missionSubtitle: '',
    visionTitle: '',
    visionSubtitle: ''
});
</script>
