<script lang="ts">

    import { onMount, setContext } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import { userInfo, userInfoData } from "../../lib/index.js";
    import Loading from "../../components/Loading.svelte";
    import Header from "../../components/Header.svelte";
    export let data;

    let loading = false;

    async function getUserInfo() {
        loading = true;
        const response = await fetch("http://localhost:8000/api/v1/user/userinfo", {
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

        if(response.data.stage === 1) {
            goto("/cif/data-pribadi");
        } else if(response.data.stage <= 2) {
            goto("/cif/data-bank");
        } else if(response.data.stage <= 3) {
            goto("/cif/data-pekerjaan");
        } else if(response.data.stage <= 4) {
            goto("/cif/data-pekerjaan");
        }

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

{#if loading}
    <Loading />
{:else}
    <div transition:fade={{ delay: 0, duration: 200 }} class="container-fluid">
        <Header session={data.session} />
    </div>
    <div transition:fly={{ opacity: 0, x: 100, duration: 200 }} class="container">
        <slot />
    </div>
{/if}