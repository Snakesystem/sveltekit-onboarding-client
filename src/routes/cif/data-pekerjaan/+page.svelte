<script lang="ts">
  import { goto } from "$app/navigation";
    import { userInfo } from "$lib/index.js";
    import { getContext } from "svelte";

    // const getUserInfo = getContext<() => Promise<void>>("getUserInfo");

    $effect(() => {
        // if($userInfo.data.stage <= 2) {
        //     goto("/cif/data-bank");
        // }
    });

</script>

<form class="mt-2" onsubmit={(e) => {e.preventDefault()}} >
    <div class="cif-content">
        <h4 class="fw-semibold">Job Information</h4>
        <p>Ini datamu sendiri</p>
        <div class="row">
            <div class="col-12 col-lg-6 mb-3">
                <label for="email" class="form-label">Email Address <span class="text-danger">*</span></label>
                <input type="email" class="form-control" id="email" bind:value={$userInfo.data.email} required>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="full_name" class="form-label">Full Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="full_name" bind:value={$userInfo.data.full_name} required>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="mobile_phone" class="form-label">Mobile Phone <span class="text-danger">*</span></label>
                <input type="tel" class="form-control" id="mobile_phone" bind:value={$userInfo.data.mobile_phone} required>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="birth_date" class="form-label">Date of Birth <span class="text-danger">*</span></label>
                <input type="date" class="form-control" id="birth_date" bind:value={$userInfo.data.birth_date} required>
            </div>
        </div>
    </div>
    <div class="nav-button d-flex justify-content-between my-3">
        <button type="button" class="btn btn-secondary btn-sm"><i class="bi bi-arrow-left"></i> Kembali</button>
        <button type="submit" class="btn btn-primary btn-sm text-white">Selanjutnya <i class="bi bi-arrow-right"></i></button>
    </div>
</form>

<style lang="scss" scoped>
    .cif-content  {
        max-height: 75vh;
        width: 100%;
        padding: 0.8rem;
        margin: 0;
        border: none;
        overflow-y: auto;
    }
</style>

