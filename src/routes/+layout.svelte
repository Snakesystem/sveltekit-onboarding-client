<script lang="ts">
  import { onMount } from "svelte";
  import { goto, afterNavigate } from "$app/navigation";
  import { getStores } from "$app/stores";
  import '../assets/css/style.css';
  import '../assets/scss/style.scss';
  import Loading from "../components/Loading.svelte";

  let pathname: string = "";
  let loading = false;
  export let data;
  let is_authenticated = data.is_authenticated;
  const url_authorized = ["/", "/profile", "/*"];
  const url_unauthorized = ["/login", "/register", "/*"];

  const { page } = getStores();
  pathname = $page.route.id || "";

  const checkSession = async () => {
    loading = true;
    await fetch("http://localhost:8000/api/v1/auth/session", {
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

{#if loading}
    <Loading />
{:else if $page.status === 404}
  <h1>404 - Page Not Found</h1>
  <a href="/">Go back home</a>
{:else}
    <slot />
{/if}
