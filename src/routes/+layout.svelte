<script lang="ts">
  import { onMount } from "svelte";
  import { goto, afterNavigate } from "$app/navigation";
  import { getStores } from "$app/stores";
  import '../assets/scss/style.scss';

  let pathname: string = "";
  export let data;
  let is_authenticated = data.is_authenticated;
  const url_authorized = ["/", "/profile"];
  const url_unauthorized = ["/login", "/register"];

  const { page } = getStores();
  pathname = $page.route.id || "";

  onMount(() => {
    afterNavigate(() => {
      if (!is_authenticated && url_authorized.includes(pathname)) {
        if (!url_unauthorized.includes(pathname)) {
          goto(pathname, { replaceState: true });
        }
      } else if ( is_authenticated && url_unauthorized.includes(pathname)) {
        goto("/", { replaceState: true });
      }
    });
    if (is_authenticated && url_unauthorized.includes(pathname)) {
      goto("/", { replaceState: true });
    } 
  });
</script>

<slot />
