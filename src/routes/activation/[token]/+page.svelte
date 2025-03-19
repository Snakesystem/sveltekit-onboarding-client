<script>
    import MainContext from "../../../components/MainContext.svelte";
    import { getStores } from "$app/stores";
    import { onMount } from "svelte";

    const { page } = getStores();

    let token = $state("");
    let result = $state({
        result: false,
        message: "Processing..."
    });

    onMount(async () => {
        page.subscribe(($page) => {
            token = $page.params.token;
        });

        if (token) {
            try {
                const res = await fetch(`http://localhost:8000/api/v1/auth/activation/${token}`);
                const data = await res.json();
                result = data;
            } catch (error) {
                console.log(error);
                result = {
                    result: false,
                    message: "Activation Failed",
                }
            }
        }
    });
  
  </script>
  
  <MainContext data={{}}>
      <div class="card">
          <h1>Activation</h1>
          <p>{result.message}</p>
          {#if !result.result}
              <a href="/login" class="btn btn-primary w-50 text-white">Kembali</a>
          {:else}
              <a href="/login" class="btn btn-primary w-50 text-white">Login Sekarang</a>
          {/if}
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