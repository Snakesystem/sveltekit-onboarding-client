<script lang="ts">
  import { goto } from "$app/navigation";
    import { getInitials, userInfo } from "../lib/index.js";
    import { cubicOut } from "svelte/easing";
    import { tweened } from "svelte/motion";

    const {session} = $props();

    let showNav = $state(false);
    let navPosition = tweened({ x: 100, y: -100, opacity: 0 }, { duration: 400, easing: cubicOut });

    function toggleNav() {
        if (showNav) {
            navPosition.set({ x: 100, y: -100, opacity: 0 });
            setTimeout(() => (showNav = false), 400); // Tunggu animasi selesai
        } else {
            showNav = true;
            navPosition.set({ x: 0, y: 0, opacity: 1 });
        }
    }

    async function logout() {
        await fetch("http://localhost:8000/api/v1/auth/logout", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res: any) => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json()
            }
        }).catch((err) => {
            console.log(err)
        });
        goto("/login");
    }

</script>

<nav class="navbar">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Logo</a>
        <button class="bg-primary rounded-circle" style="width: 40px; height: 40px;" onclick={toggleNav}>
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
    <div class="nav-menu" 
        style="transform: translate({$navPosition.x}%, {$navPosition.y}%); opacity: {$navPosition.opacity};"
        onoutrostart={() => navPosition.set({ x: 100, y: -100, opacity: 0 })}>
        <div class="nav-content">
            <div class="navbar-nav">
                <a class="nav-link" aria-current="page" href="/"><i class="bi bi-person-fill"></i><span>Profile</span></a>
                <a class="nav-link" href="/"><i class="bi bi-columns-gap"></i><span>Features</span></a>
                <a class="nav-link" href="/"><i class="bi bi-columns-gap"></i><span>Setings</span></a>
                <button class="nav-link" onclick={() => logout()}><i class="bi bi-columns-gap"></i><span>Keluar</span></button>
            </div>
            <button class="btn-close btn-close-white fw-bold" aria-label="Close" onclick={toggleNav}></button>
        </div>
    </div>
{/if}

<style scoped lang="scss">
    .nav-menu {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%; 
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
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 70%;
        border-bottom-left-radius: 90%;
        background: linear-gradient(59deg, #f19e18 0%, #e62314 89%);
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

    .navbar-nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 20rem;
        margin-bottom: 10rem;
        .nav-link {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            color: #abc7df;

            &:hover {
                color: #FFFFFF;
            }
        }
    }

    .btn-close {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;

        &:hover {
            color: #FFFFFF;
            font-weight: bold;
            transform: scale(1.1);
            transition: transform 0.3s ease-in-out;
            border: none;
            background-color: transparent;
        }
    }

    @media screen and (max-width: 768px) {
        .nav-content {
            width: 90%;
            height: 50%;

            .navbar-nav {
                margin-left: 12rem;
                justify-content: end;
                margin-bottom: 0;
                
            }
        }
    }
</style>