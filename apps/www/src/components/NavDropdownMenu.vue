<script lang="ts" setup>
import { isShowingNavDropdownMenu } from '#/storage.ts';
import { Icon } from '@iconify/vue';
import { onClickOutside } from '@vueuse/core';
import { useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';

const dropdown = useTemplateRef('dropdown')
const router = useRouter()

onClickOutside(dropdown, () => isShowingNavDropdownMenu.value = false)
</script>


<template>
<div ref="dropdown" class="md:hidden w-full">
    <Transition>
        <div
            v-if="isShowingNavDropdownMenu"
            class="text-slate-900 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 rounded-t-lg"
        >
            <div
                class="MaxContainer flex flex-col items-end selection:bg-[#B5A2FD60] **:transition-colors **:duration-200"
            >
                <button
                    class="p-5 cursor-pointer hover:text-purple-400 dark:hover:text-[#B5A2FD]"
                    @click="isShowingNavDropdownMenu = false"
                >
                    <Icon height="28" icon="lineicons:close" />
                </button>
                <div class="w-full flex flex-col gap-[1px]">
                    <template v-for="({meta, path}, index) in router.options.routes.filter(r => r.meta?.showOnNavbar)">
                        <div v-if="index > 0" class="border-t border-t-slate-300 dark:border-t-slate-700" />
                        <a :href="path"
                           class="p-5 text-nowrap hover:text-purple-400 dark:hover:text-[#B5A2FD]"
                           target="_blank">{{ meta?.title ?? '首页' }}</a>
                    </template>
                </div>
            </div>
        </div>
    </Transition>
</div>
</template>
