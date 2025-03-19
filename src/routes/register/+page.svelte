<script>
  import { goto } from "$app/navigation";
  import { confirmPassword, validPassword, validPhone } from "$lib/index.js";
  import SelectDynamic from "../../components/SelectDynamic.svelte";

  let data = $state({
    full_name: "",
    email: "",
    mobile_phone: "",
    sales: 0,
    client_category: 0,
    referral: "",
    password: "",
    confirm_password: "",
  });

  let confirmRegister = $state(false);
  let showPassword = $state(false);
  let showConfirmPassword = $state(false);

  // @ts-ignore
  function changeSales(value) {
    if(value) {
        data.sales = value
    } else {
        data.sales = 0
    }
  }

  // @ts-ignore
  function changeCategory(value) {
    if(value) {
        data.client_category = value
    } else {
        data.client_category = 0
    }
  }

  // @ts-ignore
  async function register(data) {
    const res = await fetch("http://localhost:8000/api/v1/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);
    if (result.result) {
      goto("/login");
    } else {
      alert(result.error);
    }
  }

</script>

<h4>Pendaftaran Rekening</h4>
<p>Mohon untuk melengkapi informasi Data Pribadi berikut ini dengan data yang benar!</p>
<form onsubmit={(e) => {
        e.preventDefault();
        register(data);
    }}>
    <div class="row">
        <div class="col-12 mb-3">
            <label for="full_name" class="form-label">Nama Lengkap (KTP)</label>
            <input type="text" class="form-control" id="full_name" bind:value={data.full_name} required>
        </div>
        <div class="col-12 col-lg-6 mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" bind:value={data.email} required>
        </div>
        <div class="col-12 col-lg-6 mb-3">
            <label for="mobile_phone" class="form-label">No Telepon</label>
            <input type="tel" class="form-control" id="mobile_phone" bind:value={data.mobile_phone} use:validPhone required>
        </div>
        <div class="col-12 mb-3">
            <label for="client_category" class="form-label">Layanan Transaksi</label>
            <SelectDynamic viewData="category" placeholder="Pilih layanan transaksi" onChange={changeCategory} required/>
        </div>
        <div class="col-12 col-lg-6 mb-3">
            <label for="referral" class="form-label">Kode Referral</label>
            <input type="text" class="form-control" id="referral" bind:value={data.referral}>
        </div>
        <div class="col-12 col-lg-6 mb-3">
            <label for="sales" class="form-label">Referral</label>
            <SelectDynamic viewData="sales" placeholder="Pilih Sales" onChange={changeSales} />
        </div>
        <div class="col-12 mb-3">
            <label for="password" class="form-label">Password</label>
            <div class="input-group password">
                <input id="password" type={showPassword ? "text" : "password"} class="form-control" bind:value={data.password} use:validPassword required />
                <button aria-label="Toggle password visibility" type="button" class="btn" onclick={() => showPassword = !showPassword} >
                  <i class="bi" class:bi-eye={!showPassword} class:bi-eye-slash={showPassword} ></i>
                </button>
            </div>
        </div>
        <div class="col-12 mb-3">
            <label for="password_confirmation" class="form-label">Konfirmasi Password</label>
            <div class="input-group password">
                <input id="confirm_password" type={showConfirmPassword ? "text" : "password"} class="form-control" bind:value={data.confirm_password} use:confirmPassword={{ password: data.password }} required />
                <button aria-label="Toggle password visibility" type="button" class="btn" onclick={() => showConfirmPassword = !showConfirmPassword} >
                  <i class="bi" class:bi-eye={!showConfirmPassword} class:bi-eye-slash={showConfirmPassword} ></i>
                </button>
            </div>
        </div>
        <div class="col-12 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="confirmRegister" bind:checked={confirmRegister} required>
                <label class="form-check-label" for="confirmRegister">
                  Saya menyetujui <a href="/terms-and-conditions" class="text-decoration-none"> Syarat dan Ketentuan</a>
                </label>
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-primary w-100 mb-3 text-white">Daftar Sekarang</button>
</form>