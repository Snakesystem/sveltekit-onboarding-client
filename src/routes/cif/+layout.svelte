<script lang="ts">

    import { onMount, setContext } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { baseUrl, userInfo, userInfoData } from "../../lib/index.js";
    import Loading from "../../components/Loading.svelte";
    import Header from "../../components/Header.svelte";
    import { getStores } from "$app/stores";
    export let data;

    let loading = false;
    const { page } = getStores();

    const isActive = (path: string) => {
        return path === $page.url.pathname;
    }

    async function getUserInfo() {
        loading = true;
        const response = await fetch(`${baseUrl}/api/v1/user/userinfo`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res: any) => {
            loading = false;
            if (res.ok) {
                return res.json();
            } else {
                return res.json()
            }
        }).catch((err) => {
            loading = false;
            console.log(err)
        });

        if(!response.result) {
            goto("/login");
            return;
        }

        if(response.data.idcard_file !== "" || response.data.selfie_file === "" || response.data.signature_file === "") {
            goto("/cif");
        } else {
            if(response.data.stage === 1) {
                goto("/cif/data-pribadi");
            } else if(response.data.stage <= 2) {
                goto("/cif/data-bank");
            } else if(response.data.stage <= 3) {
                goto("/cif/data-pekerjaan");
            } else if(response.data.stage <= 4) {
                goto("/cif/data-pendukung");
            }
        }

        loading = false;
        userInfo.set(response);
    }

    setContext("getUserInfo", getUserInfo);

    onMount(() => {
        getUserInfo();
        return () => {
            userInfo.set({
                result: false,
                message: "",
                data: userInfoData,
                error: null
            });
        };
    });

</script>

<div transition:fade={{ delay: 0, duration: 200 }}>
    <Header session={data.session} />
</div>
<div class="container">
    <nav class="navbar">
        <div class="navbar-nav">
            <a class="nav-link {$userInfo.data.stage === 1 || $userInfo.data.stage > 1 ? 'active-stage' : ''} {isActive('/cif/data-pribadi') ? 'active' : ''}" 
                href="/cif/data-pribadi">
                {#if $userInfo.data.stage === 1 || $userInfo.data.stage > 1}
                    <i class="bi bi-check-lg fs-1 fw-bold"></i>
                {:else}
                    <i class="bi bi-person-fill"></i>
                {/if}
                <span>Personal Data</span>
            </a>
            <a class="nav-link {$userInfo.data.stage === 2 || $userInfo.data.stage > 2 ? 'active-stage' : ''} {isActive('/cif/data-bank') ? 'active' : ''}" 
                href="/cif/data-bank">
                {#if $userInfo.data.stage === 2 || $userInfo.data.stage > 2}
                    <i class="bi bi-check-lg fs-1 fw-bold"></i>
                {:else}
                    <i class="bi bi-bank"></i>
                {/if}
                <span>Bank Information</span>
            </a>
            <a class="nav-link {$userInfo.data.stage === 3 || $userInfo.data.stage > 3 ? 'active-stage' : ''} {isActive('/cif/data-pekerjaan') ? 'active' : ''}" 
                href="/cif/data-pekerjaan">
                {#if $userInfo.data.stage === 3 || $userInfo.data.stage > 3}
                    <i class="bi bi-check-lg fs-1 fw-bold"></i>
                {:else}
                    <i class="bi bi-briefcase-fill"></i>
                {/if}
                <span>Job Information</span>
            </a>
            <a class="nav-link {$userInfo.data.stage === 4 || $userInfo.data.stage > 4 ? 'active-stage' : ''} {isActive('/cif/data-pendukung') ? 'active' : ''}" 
                href="/cif/data-pendukung">
                {#if $userInfo.data.stage === 4 || $userInfo.data.stage > 4}
                    <i class="bi bi-check-lg fs-1 fw-bold"></i>
                {:else}
                    <i class="bi bi-images"></i>
                {/if}
                <span>Document</span>
            </a>
        </div>
        <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow={$userInfo.data.stage * 20} aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: {$userInfo.data.stage * 20}%"></div>
        </div>
    </nav>
    {#if loading}
        <h1 class="text-center">Loading.......</h1>
    {:else}
        <div class="mt-3" transition:fly={{ opacity: 0, x: 1000, duration: 500 }}>
            <slot />
        </div>
    {/if}
</div>

<style lang="scss" scoped>
    .navbar {
        display: flex;
        flex-direction: column;
    }
    .progress{
        width: 100%;
        height: 0.5rem;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 1;
        .progress-bar{
            height: 0.5rem;
        }
    }
    .navbar-nav {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
        z-index: 2;

        .nav-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #dce3e9;
            width: 5.4rem;
            height: 5.4rem;
            border-radius: 50%;
            i {
                font-size: 2rem;
            }

            span {
                position: absolute;
                bottom: -1rem;
                font-size: 1rem;
                color: #202020;
            }

            &.active-stage {
                border: 3px solid #e4461e;
                color: #e4461e;
                background-color: #FFF;
            }

            &.active {
                background-color: #e4461e;
                border: 3px solid #ffa807;
                color: #FFF;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .navbar {
            margin-top: -1rem;
        }

        .nav-link {
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #dce3e9;
            width: 50px !important;
            height: 50px !important;
            border: 3px solid #FFF;
            color: #FFF;

            i {
                font-size: 1rem !important;

                &.bi-check-lg {
                    font-size: 1.5rem !important;
                    font-weight: 900 !important;
                }
            }
        }

        span {
            display: none;
        }
    }
</style>