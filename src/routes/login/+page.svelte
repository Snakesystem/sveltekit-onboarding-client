<script lang="ts">
  import { goto } from "$app/navigation";

  async function login() {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "example@gmail.com",
        password: "54321",
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.result) {
      goto("/");
    } else {
      alert(data.message);
    }
  }
</script>

<h1>Login</h1>
<button on:click={login}>Login</button>
