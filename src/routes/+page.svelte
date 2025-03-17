<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  export let data;

  async function logout() {
    const res = await fetch("http://localhost:8000/api/v1/auth/logout", {
      credentials: "include",
      method: "POST",
    });
    const data = await res.json();
    if (data.result) {
      goto("/login");
    }
  }

  onMount(() => {
    goto("/cif");
  });

</script>

<h1>Profile Page</h1>
<p>Nama Lengkap: {data.session?.fullname}</p>
<p>Email: {data.session?.email}</p>
<p>Referral ID: {data.session?.referral}</p>
<p>Client Category: {data.session?.client_category}</p>

<button on:click={logout}>Logout</button>