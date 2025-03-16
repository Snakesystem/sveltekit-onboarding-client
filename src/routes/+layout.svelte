<script lang="ts">
  import { onMount } from "svelte";
  import { goto, afterNavigate } from "$app/navigation";
  import { getStores } from "$app/stores";

  export let data;
  let session = data.session;

  const { page } = getStores();

  onMount(() => {
    afterNavigate(() => {
      if (!session && ["/", "/profile"].includes(page.url.pathname)) {
        goto("/login", { replaceState: true });
      } else if (
        session &&
        ["/login", "/register"].includes(page.url.pathname)
      ) {
        goto("/", { replaceState: true });
      }
    });
  });
</script>

<slot />
