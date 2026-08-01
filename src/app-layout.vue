<template>
    <div class="layout-container layout-horizontal layout-light-menu">
        <LayoutsTopbar></LayoutsTopbar>
        <div class="layout-content-wrapper">
            <slot />
        </div>
        <layoutsFooter></layoutsFooter>
        <div class="layout-mask"></div>
        <LayoutsConfirm></LayoutsConfirm>
    </div>
</template>

<script setup lang="ts">
const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref<null | ((event: MouseEvent) => void)>(null);

function bindOutsideClickListener(): void {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event: MouseEvent) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive = false;
                layoutState.overlaySubmenuActive = false;
                layoutState.staticMenuMobileActive = false;
                layoutState.menuHoverActive = false;
                layoutState.configSidebarVisible = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

function unbindOutsideClickListener(): void {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener.value);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event: MouseEvent): boolean {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarButtonEl = document.querySelector('.topbar-start > button');

    return !(
        (sidebarEl && (sidebarEl.isSameNode(event.target as Node) || sidebarEl.contains(event.target as Node))) ||
        (topbarButtonEl && (topbarButtonEl.isSameNode(event.target as Node) || topbarButtonEl.contains(event.target as Node)))
    );
}

watch(isSidebarActive, (newVal: boolean) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});
</script>

<style lang="scss">
@import '@/assets/css/style.scss';
</style>
