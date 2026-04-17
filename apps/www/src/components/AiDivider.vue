<template>
    <div class="TickLeft TickRight relative border border-dashed border-slate-300 dark:border-slate-700" />
</template>

<style scoped>
.TickLeft::before {
    content: '';
    border-top: 5px solid #0000;
    border-bottom: 5px solid #0000;
    border-right: 5px solid #0000;
    border-left: 5px solid var(--color-slate-300);
    width: 0;
    height: 0;
    position: absolute;
    top: -5px;
    left: -1px;
}

.dark .TickLeft::before {
    border-left: 5px solid var(--color-slate-700);
    left: 0;
}

.TickRight::after {
    content: '';
    border-top: 5px solid #0000;
    border-right: 5px solid var(--color-slate-300);
    border-bottom: 5px solid #0000;
    border-left: 5px solid #0000;
    width: 0;
    height: 0;
    position: absolute;
    top: -5px;
    right: -1px;
}

.dark .TickRight::after {
    border-right: 5px solid var(--color-slate-700);
    right: 0;
}
</style>
