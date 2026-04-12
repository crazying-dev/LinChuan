<script lang="ts" setup>
import { isShowingNavDropdownMenu } from '#/storage.ts';
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

defineProps<{ cover?: boolean }>()

const router = useRouter()
</script>


<template>
<div v-if="cover" class="w-full">
    <div class="MaxContainer selection:bg-[#B5A2FD60] **:transition-colors **:duration-200">
        <div class="md:hidden flex justify-end">
            <button
                class="p-5 cursor-pointer hover:text-purple-400 dark:hover:text-[#B5A2FD]"
                @click="isShowingNavDropdownMenu = true"
            >
                <Icon height="28" icon="lineicons:menu" />
            </button>
        </div>
        <div class="md:flex hidden flex-nowrap justify-end gap-4">
            <a
                v-for="{meta, path} in router.options.routes.filter(r => r.meta?.showOnNavbar)"
                :href="path"
                class="px-6 py-5 font-bold hover:text-orange-200 dark:hover:text-orange-300 hover:bg-[#B5A2FDA0] dark:hover:bg-[#B5A2FD50]"
            >
                {{ meta?.title ?? '首页' }}
            </a>
        </div>
    </div>
</div>
<div v-else class="w-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white">
    <div class="MaxContainer selection:bg-[#B5A2FD60] **:transition-colors **:duration-200">
        <div class="md:hidden flex justify-end">
            <button
                class="p-5 cursor-pointer hover:text-purple-400 dark:hover:text-[#B5A2FD]"
                @click="isShowingNavDropdownMenu = true"
            >
                <Icon height="28" icon="lineicons:menu" />
            </button>
        </div>
        <div class="md:flex hidden flex-nowrap justify-end gap-4">
            <a
                v-for="{meta, path} in router.options.routes.filter(r => r.meta?.showOnNavbar)"
                :href="path"
                class="px-6 py-5 font-bold hover:text-cyan-600 dark:hover:text-orange-300 hover:bg-cyan-200 dark:hover:bg-[#B5A2FD50]"
            >
                {{ meta?.title ?? '首页' }}
            </a>
        </div>
    </div>
</div>
</template>
