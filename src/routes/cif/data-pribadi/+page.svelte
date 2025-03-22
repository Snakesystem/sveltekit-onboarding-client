<script lang="ts">
    import { goto } from "$app/navigation";
    import { formatDate, userInfo, userInfoData } from "$lib/index.js";
    import { getContext } from "svelte";
    import AutoComplete from "../../../components/AutoComplete.svelte";
    import SelectDynamic from "../../../components/SelectDynamic.svelte";

    const getUserInfo = getContext<() => Promise<void>>("getUserInfo");

    $effect(() => {
        getUserInfo();
    })

    let data = $state($userInfo.data);
    let changeIf = $state({
        education: 0,
    });

    $effect(() => {
        data.birth_date = formatDate(data.birth_date);
        data.idcard_expire_date = formatDate(data.idcard_expire_date);
    })

    function changeGender(e: any) {
        data.sex = e;
    }
    
    function changeNationality(e: any) {
        data.sex = e;
    }

    function changeMaritalStatus(e: any) {
        data.sex = e;
    }

    function changeEducation(e: any) {
        data.sex = e;
        changeIf.education = e;
    }

    function changeReligion(e: any) {
        data.sex = e;
    }

    function changeCity(e: any) {
        console.log('object', e)
        data.idcard_city = e;
    }

</script>

<form class="mt-2" onsubmit={(e) => {e.preventDefault()}} >
    <div class="cif-content">
        <h4 class="fw-semibold">Personal Information</h4>
        <p>Isi datamu sendiri</p>
        <div class="row">
            <div class="col-12 col-lg-6 mb-3">
                <label for="email" class="form-label">Email Address <span class="text-danger">*</span></label>
                <input type="email" class="form-control" id="email" bind:value={data.email} required>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="full_name" class="form-label">Full Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="full_name" bind:value={data.full_name} required>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="mobile_phone" class="form-label">Mobile Phone <span class="text-danger">*</span></label>
                <input type="tel" class="form-control" id="mobile_phone" bind:value={data.mobile_phone} required>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="mother_name" class="form-label">Mother Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="mother_name" bind:value={data.mother_name} required>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="idcard_number" class="form-label">ID Card Number <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="idcard_number" bind:value={data.idcard_number} required>
            </div>
            <div class="col-12 col-lg-3 mb-3">
                <label for="birth_place" class="form-label">Place of Birth <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="birth_place" bind:value={data.birth_place} required>
            </div>
            <div class="col-12 col-lg-3 mb-3">
                <label for="birth_date" class="form-label">Date of Birth <span class="text-danger">*</span></label>
                <input type="date" class="form-control" id="birth_date" bind:value={data.birth_date} required>
            </div>
            <div class="col-12 col-lg-3 mb-3">
                <label for="nationality" class="form-label">Nationality <span class="text-danger">*</span></label>
                <SelectDynamic viewData="nationality" placeholder="Pilih kebangsaan" onChange={changeNationality} required />
            </div>
            <div class="col-12 col-lg-3 mb-3">
                <label for="gender" class="form-label">Gender <span class="text-danger">*</span></label>
                <SelectDynamic viewData="gender" placeholder="Pilih jenis kelamin" onChange={changeGender} required />
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="birth_country" class="form-label">Country of Birth <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="birth_country" bind:value={data.birth_country} required>
            </div>
            <div class="col-12 col-lg-3 mb-3">
                <label for="religion" class="form-label">Religion <span class="text-danger">*</span></label>
                <SelectDynamic viewData="religion" placeholder="Pilih jenis kelamin" onChange={changeReligion} required />
            </div>
            <div class="col-12 col-lg-3 mb-3">
                <label for="marital_status" class="form-label">Marital Status <span class="text-danger">*</span></label>
                <SelectDynamic viewData="maritalstatus" placeholder="Pilih jenis kelamin" onChange={changeMaritalStatus} required />
            </div>
            <div class="col-12 col-lg-3 mb-3">
                <label for="education" class="form-label">Education <span class="text-danger">*</span></label>
                <SelectDynamic viewData="education" placeholder="Pilih jenis kelamin" onChange={changeEducation} required/>
            </div>
            {#if changeIf.education === 1}
                <div class="col-12 col-lg-3 mb-3">
                    <label for="education_text" class="form-label">Other Education <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" id="education_text" bind:value={data.education_text} required>
                </div>
            {/if}
            <div class="col-12 col-lg-3 mb-3">
                <label for="idcard_expire_date" class="form-label">IDCard Expire Date <span class="text-danger">*</span></label>
                <input type="date" class="form-control" id="idcard_expire_date" bind:value={data.idcard_expire_date} required>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="idcard_country" class="form-label">IDCard Country <span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="idcard_country" bind:value={data.idcard_country} required>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="idcard_country" class="form-label">IDCard Country <span class="text-danger">*</span></label>
                <AutoComplete placeholder="Cari kota..." onChange={changeCity} />
            </div>
        </div>
    </div>
    <div class="nav-button d-flex justify-content-between my-3">
        <button type="button" class="btn btn-secondary btn-sm" onclick={() => goto("/forget-password")}><i class="bi bi-arrow-left"></i> Kembali</button>
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