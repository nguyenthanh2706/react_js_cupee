<template>
    <div class="flex flex-wrap justify-center gap-4 px-8 py-2">
        <button
            v-for="(item, index) in category.list"
            :key="index"
            type="button"
            class="flex flex-col items-center gap-2 shrink-0 px-4 py-2 transition-colors"
            :class="item.checked ? 'border-b-2 border-[#a38d78] text-[#a38d78]' : 'bg-white text-[#000000] border-gray-200'"
            @click="selectCategory(item)"
        >
            <span class="whitespace-nowrap uppercase text-lg">
                {{ item.data.name }}
            </span>
        </button>

        <button v-if="category.loadMore" type="button" class="flex flex-col items-center gap-2 shrink-0 px-4 py-2 transition-colors border-gray-200 hover:text-[#a38d78]" @click="getMoreCategory">
            <span class="whitespace-nowrap uppercase text-lg">{{ $t('introduceCompany.featuredProducts.more') }}...</span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { UnwrapRefSimple } from '@vue/reactivity';
import { onMounted, reactive, ref } from 'vue';

const { locale, t } = useI18n();
const { $showMessage } = useNuxtApp();

interface RawCategory {
    id: number | string;
    code: string;
    name: string;
    [key: string]: any;
}

interface CategoryItem {
    checked: boolean;
    data: RawCategory;
}

interface CategoryState {
    list: CategoryItem[];
    page: number;
    limit: number;
    loadMore: boolean;
}

const emit = defineEmits<{
    (e: 'update:category', value: Record<string, any> | null): void;
}>();

const loading = ref<boolean>(false);
const category = reactive<CategoryState>({
    list: [],
    page: 1,
    limit: 5,
    loadMore: false
});

const getQueryString = (): string => {
    let query = [`page=${category.page}`, `limit=${category.limit}`, `lang=${locale.value}`];
    return query.join('&');
};
const getListCategory = async (): Promise<void> => {
    loading.value = true;
    const params = getQueryString();
    const { data } = await useProduct(t, $showMessage).listCategory(params);
    const dataOptions = data?.data ?? [];
    updateLoadMore(dataOptions);
    updateListCategory(dataOptions);
    loading.value = false;
};
onMounted(() => {
    getListCategory();
});
const updateLoadMore = (data: RawCategory[]): void => {
    category.loadMore = data?.length > 0;
};

const updateListCategory = (data: RawCategory[]): void => {
    category.list = [
        ...category.list,
        ...(data?.map((item) => ({
            checked: false,
            data: item
        })) || [])
    ];
};

const getMoreCategory = async (): Promise<void> => {
    category.page++;
    await getListCategory();
};

const selectCategory = (item: UnwrapRefSimple<CategoryItem>): void => {
    item.checked = !item.checked;
    if (item.checked) {
        category.list.forEach((item) => {
            item.checked = false;
        });
        item.checked = true;
        emit('update:category', item.data);
    } else {
        emit('update:category', category.list[0]);
    }
};

const handleCategory = (): void => {
    if (category.list.length > 0) return;
    getListCategory();
};

const clearFilter = (): void => {
    category.list.forEach((item) => {
        item.checked = false;
    });
};

defineExpose({
    handleCategory,
    clearFilter
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
