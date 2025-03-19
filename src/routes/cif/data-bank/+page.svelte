<script lang="ts">
  import { userInfo } from "$lib/index.js";
    import { getContext, onMount } from "svelte";

    // Ambil function dari context
    const getUserInfo = getContext<() => Promise<void>>("getUserInfo");

    onMount(() => {
        if($userInfo.data.stage < 2) {
            // getUserInfo();
        }
    })

</script>

<h1>Data Bank</h1>