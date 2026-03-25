<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { useClipboard } from '@vueuse/core';

defineProps<{ plaintext: string }>()
// bg-pink-200 hover:bg-pink-400 dark:bg-pink-600 dark:hover:bg-pink-800 disabled:bg-pink-100 dark:disabled:bg-pink-950
const { copy, copied } = useClipboard()
</script>


<template>
<button
    :disabled="copied"
    class="flex items-center cursor-pointer rounded-md"
    @click="copy(plaintext)">
    <slot></slot>
    <Icon v-if="copied" class="ml-1 -mr-2" height="24" icon="dashicons:yes" />
</button>
</template>


<style scoped>
</style>
