<script lang="ts">
  import { onMount } from "svelte";
  // import { goto, afterNavigate } from "$app/navigation";
  import { getStores } from "$app/stores";
  import '../assets/css/style.css';
  import '../assets/scss/style.scss';
  import Loading from "../components/Loading.svelte";
  import { baseUrl } from "$lib/index.js";

  let pathname: string = "";
  let loading = false;
  const { page } = getStores();
  export let data;
  let is_authenticated = data.is_authenticated;
  
  pathname = $page.route.id || "";

  const checkSession = async () => {
    loading = true;
    await fetch(`${baseUrl}/api/v1/auth/session`, {
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
        is_authenticated = false;
        return res.json()
      }
    }).catch((err) => {
      loading = false;
      is_authenticated = false;
    })
  }

  onMount(() => {
    checkSession();
    // afterNavigate(() => {
    //   if (!is_authenticated && url_authorized.includes(pathname)) {
    //     console.log('object 1')
    //     if (!url_unauthorized.includes(pathname)) {
    //       console.log('object 2')
    //       goto(pathname, { replaceState: true });
    //     }
    //   } else if ( is_authenticated && url_unauthorized.includes(pathname)) {
    //     console.log('object 3')
    //     goto("/", { replaceState: true });
    //   }
    // });
    // if(is_authenticated && url_unauthorized.includes(pathname)) {
    //   console.log('object 4')
    //   goto("/", { replaceState: true });
    // } 
  });
</script>

{#if loading}
    <Loading />
{:else if $page.status === 404}
  <h1>404 - Page Not Found</h1>
  <a href="/">Go back home</a>
{:else}
    <slot />
{/if}
