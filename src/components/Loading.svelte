<script lang="ts">
    import { fade } from "svelte/transition";
    import { Circle3 } from 'svelte-loading-spinners';
</script>

<div transition:fade={{ duration: 100 }} class="loading">
    <Circle3 size="50" unit="px" duration="1s" />
    <h1>Loading.....</h1>
</div>

<style>
    .loading {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        position: absolute;
        z-index: 999;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
    }
</style>