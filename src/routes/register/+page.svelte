<script>
  import SelectDynamic from "../../components/SelectDynamic.svelte";


</script>

<h5>Register</h5>
<p>Mohon untuk melengkapi informasi Data Pribadi berikut ini dengan data yang benar!</p>
<form action="">
    <div class="row">
        <div class="col-12 mb-3">
            <label for="full_name" class="form-label">Nama Lengkap (KTP)</label>
            <input type="text" class="form-control" id="full_name">
        </div>
        <div class="col-12 col-lg-6 mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email">
        </div>
        <div class="col-12 col-lg-6 mb-3">
            <label for="phone" class="form-label">No Telepon</label>
            <input type="text" class="form-control" id="phone">
        </div>
        <div class="col-12 mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password">
        </div>
        <div class="col-12 col-lg-6 mb-3">
            <label for="sales" class="form-label">Sales</label>
            <SelectDynamic viewData="sales" placeholder="Pilih Sales" />
        </div>
        <div class="col-12 mb-3">
            <label for="password_confirmation" class="form-label">Konfirmasi Password</label>
            <input type="password" class="form-control" id="password_confirmation">
        </div>
    </div>
</form>