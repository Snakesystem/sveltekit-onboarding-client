<script lang="ts">
    import { getInitials, userInfo } from "../lib/index.js";
    import { slide, scale } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { tweened } from "svelte/motion";
    import { writable } from "svelte/store";

    const {session} = $props();

    let showNav = $state(false);

    let navPosition = tweened({ x: 100, y: -100, opacity: 0 }, { duration: 400, easing: cubicOut });

    function toggleNav() {
        showNav = !showNav;
        navPosition.set(showNav ? { x: 0, y: 0, opacity: 1 } : { x: 100, y: -100, opacity: 0 });
    }

</script>

<nav class="navbar">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Logo</a>
        <button class="bg-info rounded-circle" style="width: 40px; height: 40px;" onclick={toggleNav}>
            <span>
                {#if session?.picture}
                    <img src={session.picture} alt="" />
                {:else}
                    <strong>{getInitials($userInfo.data.full_name)}</strong>
                {/if}
            </span>
        </button>
    </div>
</nav>

{#if showNav}
    <div class="nav-menu" style="transform: translate({$navPosition.x}%, {$navPosition.y}%); opacity: {$navPosition.opacity};">
        <div class="nav-content">
            <div class="navbar-nav">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
                <a class="nav-link" href="/">Features</a>
                <a class="nav-link" href="/">Pricing</a>
                <a class="nav-link" href="/">Disabled</a>
            </div>
            <button class="bg-info rounded-circle">Tombol</button>
        </div>
    </div>
{/if}

<style>
    .nav-menu {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%; /* Sepertiga layar */
        height: 100%;
        display: flex;
        justify-content: end;
        z-index: 9;
        background: rgba(0, 0, 0, 0.7);
    }

    .nav-content {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 20px;
        width: 80%;
        height: 80%;
        box-shadow: -4px 0px 10px rgba(0, 0, 0, 0.2);
        border-bottom-left-radius: 95%;
        background: white;
        z-index: 99;
    }

    .nav-link {
        font-size: 18px;
        font-weight: bold;
        color: black;
        text-decoration: none;
        padding: 10px 20px;
        transition: color 0.3s;
    }

    .nav-link:hover {
        color: #0d6efd;
    }
</style>