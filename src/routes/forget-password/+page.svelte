<script>
  import { baseUrl } from "$lib/index.js";
  import MainContext from "../../components/MainContext.svelte";

  let email = $state("")
  let result = $state({
      result: false,
      message: "",
      error: null,
      data: null
  })

  // @ts-ignore
  async function forgetPassword() {
    result.message = "Processing...";
    const res = await fetch(`${baseUrl}/api/v1/auth/reset-password`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email})
    })

    result = await res.json();
  }

</script>

<MainContext data={{}}>
    <div class="card container">
        <h1>Reset kata Sandi</h1>
        <p class="text-center">Masukkan email Anda, dan kami akan membantu Anda mereset kata sandi dengan instruksi yang kami kirimkan.</p>
        <form class="w-100" onsubmit={(e) => {
            e.preventDefault();
            forgetPassword();
        }}>
            <div class="mb-3 text-center">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control text-center" id="email" bind:value={email} required>
            </div>
            <button type="submit" class="btn btn-primary w-100 text-white mb-3">Submit</button>
            <p class="text-center">Kembali ke <a href="/login" class="text-decoration-none">Login</a></p>

            {#if result.result}
                <div class="alert alert-success text-center" role="alert">
                    {result.message}
                </div>
            {:else if result.message}
                <div class="alert alert-danger text-center" role="alert">
                    {result.message}
                </div>
            {/if}
        </form>
    </div>
</MainContext>

<style lang="scss" scoped>
    .card {
        border: none;
        display: flex;
        flex-direction: column; 
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
</style>