<script>
    import MainContext from "../../../components/MainContext.svelte";
    import { getStores } from "$app/stores";
    import { onMount } from "svelte";
    import { confirmPassword, validPassword } from "$lib/index.js";

    const { page } = getStores();
    const resetData = $state({
        email: "",
        reset_password_key: "",
        password: "",
        confirm_password: ""
    })

    let showPassword = $state(false);
    let showConfirmPassword = $state(false);
    let result = $state({
        result: false,
        message: ""
    });

    onMount(async () => {
        page.subscribe(($page) => {
            resetData.reset_password_key = $page.params.token;
        });
    });

    async function changePassword() {
        result.message = "Processing...";
        result.message = "Processing...";
        const res = await fetch(`http://localhost:8000/api/v1/auth/change-password`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resetData)
        })

        result = await res.json();
    }
  
  </script>
  
  <MainContext data={{}}>
    <div class="card container">
        <h1>Ganti kata Sandi</h1>
        <p class="text-center">Masukkan email Anda, dan kami akan membantu Anda mereset kata sandi dengan instruksi yang kami kirimkan.</p>
        <form class="w-100" onsubmit={(e) => {
            e.preventDefault();
            changePassword();
        }}>
            <div class="mb-3 text-center">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control text-center" id="email" bind:value={resetData.email} required>
            </div>
            <div class="col-12 mb-3">
                <label for="password" class="form-label">Password</label>
                <div class="input-group password">
                    <input id="password" type={showPassword ? "text" : "password"} class="form-control" bind:value={resetData.password} use:validPassword required />
                    <button aria-label="Toggle password visibility" type="button" class="btn" onclick={() => showPassword = !showPassword} >
                      <i class="bi" class:bi-eye={!showPassword} class:bi-eye-slash={showPassword} ></i>
                    </button>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label for="password_confirmation" class="form-label">Konfirmasi Password</label>
                <div class="input-group password">
                    <input id="confirm_password" type={showConfirmPassword ? "text" : "password"} class="form-control" bind:value={resetData.confirm_password} use:confirmPassword={{ password: resetData.password }} required />
                    <button aria-label="Toggle password visibility" type="button" class="btn" onclick={() => showConfirmPassword = !showConfirmPassword} >
                      <i class="bi" class:bi-eye={!showConfirmPassword} class:bi-eye-slash={showConfirmPassword} ></i>
                    </button>
                </div>
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