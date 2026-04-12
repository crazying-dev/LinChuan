<script lang="ts" setup>
import Background from '#/assets/background.jpg';
import Navbar from '#/components/Navbar.vue';
import NavDropdownMenu from '#/components/NavDropdownMenu.vue';
import { signature, tighnari } from '@navifox/constants';
import { logger } from '@navifox/utils';

logger.draw(signature, '#459199')
</script>


<template>
<img :src="Background" alt="背景图片" class="absolute size-full select-none object-cover z-0" />
<div class="absolute size-full bg-black/33 dark:bg-black/67 z-10" />
<Navbar class="absolute right-0 z-30" cover />
<NavDropdownMenu class="fixed right-0 z-40" />
<div class="MaxContainer h-screen flex flex-col selection:bg-[#B5A2FD60] z-20 **:z-20">
    <div class="h-full mb-8 md:mb-20 flex flex-col justify-end">
        <div
            class="w-fit text-xl md:text-2xl mb-4 not-dark:px-2 py-1 rounded-md not-dark:bg-[#B5A2FDA0] dark:text-[#B5A2FD]">
            <code>@{{ tighnari.uid }}</code>
        </div>
        <div class="font-medium text-4xl md:text-6xl md:max-w-[75%]">
            <span class="text-white">{{ tighnari.name }}</span>
            <span v-for="tag in tighnari.tags" class="text-gray-300/75 dark:text-gray-400">／{{ tag }}</span>
        </div>
        <div class="text-4xl md:text-5xl mt-4 text-white dark:text-gray-400 font-sign" v-html="tighnari.description" />
    </div>
</div>
</template>


<!--suppress CssUnusedSymbol-->
<style scoped>
.v-enter-active {
    transition: all 0.3s ease-out;
}

.v-leave-active {
    transition: all 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
