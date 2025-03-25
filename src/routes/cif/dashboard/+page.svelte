<script>
  import { goto } from "$app/navigation";
  import { userInfo } from "$lib/index.js";

    $effect(() => {
        if($userInfo.data.stage <= 4) {
            goto("/cif/data-pendukung");
        }
    })
</script>

<h1>Dashboard</h1>