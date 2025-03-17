<script lang="ts">
    import { getInitials, userInfo } from "../lib/index.js";
    import { slide } from "svelte/transition";
    import { writable } from "svelte/store";

    const {session} = $props();

    let showNav = writable(false);

    function toggleNav() {
        showNav.update(v => !v);
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

{#if $showNav}
    <div class="nav-menu" transition:slide>
        <div class="nav-content">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
            <a class="nav-link" href="/">Features</a>
            <a class="nav-link" href="/">Pricing</a>
            <a class="nav-link" href="/">Disabled</a>
        </div>
    </div>
{/if}

<style>
    .nav-menu {
        position: fixed;
        top: 0;
        right: 0;
        width: 33.33vw; /* Sepertiga layar */
        height: 50vh;
        background: white;
        box-shadow: -4px 0px 10px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .nav-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
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