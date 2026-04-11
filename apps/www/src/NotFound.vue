<script lang="ts" setup>
import NotFoundAnimation from '#/assets/notfound.gif';
</script>


<template>
<div class="h-dvh flex">
    <div class="h-full m-auto flex flex-col justify-center items-center text-slate-600 dark:text-slate-400">
        <img :src="NotFoundAnimation" alt="Animation" class="max-w-64" style="width: calc(100vw - 4rem)" />
        <h2 class="text-2xl mt-8">页面不存在</h2>
        <h3 class="text-lg mt-1">Page Not Found</h3>
    </div>
</div>
</template>
