<script lang="ts" setup>
import NotFoundAnimation from '#/assets/notfound.gif';
</script>

<template>
    <div class="flex h-dvh">
        <div class="m-auto flex h-full flex-col items-center justify-center text-slate-600 dark:text-slate-400">
            <img :src="NotFoundAnimation" alt="Animation" class="max-w-64" style="width: calc(100vw - 4rem)" />
            <h2 class="mt-8 text-2xl">页面不存在</h2>
            <h3 class="mt-1 text-lg">Page Not Found</h3>
        </div>
    </div>
</template>
