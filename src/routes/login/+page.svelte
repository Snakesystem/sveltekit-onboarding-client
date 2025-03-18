<script lang="ts">
  import { goto } from "$app/navigation";
  import LoginGoogleButton from "../../components/LoginGoogleButton.svelte";

  const form = $state({ email: "", password: "" });

  async function login() {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
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

<div class="container-fluid py-0 my-0 login-page">
  <div class="row justify-content-center">
    <div class="col-lg-7 left-login">
      <div class="card-form-login">
        <i class="logo-company"></i>
        <div class="card border-0">
          <h4 class="fw-bold">Masuk ke akun anda</h4>
          <p class="text-login">
            Masuk sekarang untuk teruskan langkah Anda di dunia trading
          </p>
          <div class="flex-row text-center mb-3">
            <LoginGoogleButton />
          </div>
          <!-- <div class="flex-row text-center mb-3">
            <LoginFacebookButton />
          </div> -->
          <div class="d-flex flex-row text-center">
            <hr class="w-100" />
            <span class="mx-3">atau</span>
            <hr class="w-100" />
          </div>
          <form onsubmit={(e) => {
              e.preventDefault();
              login();
            }} >
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" bind:value={form.email} />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" bind:value={form.password}/>
            </div>
            <a href="/forget-password" class="text-decoration-none" >Lupa Password</a >
            <button type="submit" class="btn btn-primary my-3 w-100 text-white" >Masuk</button >
            <span >Belum punya akun? <a href="/register" class="text-decoration-none">Daftar Sekarang</a ></span >
          </form>
        </div>
      </div>
    </div>
    <div class="col-lg-5 right-login"> 
      <div class="bacground-login">
        <div class="text-landing-page">
          <span class="unlock">Unlock Your</span>
          <span class="trading">Trading Potetial</span>
          <span class="with-strade">with s-trade</span>
        </div>
        <img src="/img/landing-page-img.png" alt="landing-page" />
      </div>
    </div>
  </div>
</div>

<style scoped lang="scss">
  .left-login {
    height: 100vh;
    padding: 30px 0;
    display: flex;
    justify-content: center;

    .card-form-login {
      margin: auto;
    }
  }

  .right-login {
    height: 100vh;
    background: linear-gradient(59deg, #2AF598 0%, #08AEEA 89%);

    .bacground-login {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      .text-landing-page {
        position: absolute;
        top: 2%;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 3rem;
        color: #fff;
        line-height: 3rem;

        .unlock {
          font-weight: bold;
        }

        .trading {
          font-style: italic;
          font-weight: 900;
        }
      }
      img {
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>
