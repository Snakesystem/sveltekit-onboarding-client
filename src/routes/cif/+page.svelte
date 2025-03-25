<script lang="ts">
    import { goto } from "$app/navigation";
    import { baseUrl, userInfo } from "$lib/index.js";
    import { onMount } from "svelte";
    import UploadFileField from "../../components/UploadFileField.svelte";
    let images = $state({
        idcard_file: '/img/valid-ktp.png',
        selfie_file: '/img/valid-selfie.png',
        signature_file: '/img/valid-signature.png',
    });

    $effect(() => {
        images.idcard_file =`${baseUrl}/upload/${$userInfo.data.idcard_file}`;
        images.selfie_file = `${baseUrl}/upload/${$userInfo.data.selfie_file}`;
        images.signature_file = `${baseUrl}/upload/${$userInfo.data.signature_file}`;
    })

    onMount(() => {
        if($userInfo.data.idcard_file !== "" || $userInfo.data.selfie_file !== "" || $userInfo.data.signature_file !== "") {
            goto("/cif/dashboard");
        }
    })

    async function saveCIFFile() {
        await fetch(`${baseUrl}/api/v1/user/save-cif-file`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify($userInfo.data)
        }).then((res: any) => {
            if (res.ok) {
                return res.json();
            } 
        }).catch((err) => {
            alert(err.message);
        });
    }

</script>

<form class="mt-2" onsubmit={(e) => {
        e.preventDefault();
        saveCIFFile();
    }} >
    <div class="cif-content">
        <h4 class="fw-semibold">File Requirements</h4>
        <p>Please upload documents to verify data authenticity.</p>
        <div class="row">
            <div class="col-12 col-lg-4 mb-3">
                <label for="idcard_file" class="form-label">ID Card File <span class="text-danger">*</span></label>
                <div class="card card-file-upload">
                    <div class="card-header">
                        {#if $userInfo.data.idcard_file}
                            <img src={images.idcard_file} class="img-fluid" alt="">
                        {/if}
                    </div>
                    <div class="card-body">
                        <h5>{$userInfo.data.idcard_file ? `${$userInfo.data.full_name} - KTP File` : "Belum ada dokument yang diupload"}</h5>
                        <p>Foto e-KTP (format gambar: *.jpg,*.png, *.bmp)</p>
                        <UploadFileField 
                            id="idcard_file"
                            accept={[".jpg", ".jpeg", ".png"]} 
                            size={{ width: 300, height: 300 }} 
                            on:change={(e) => {
                                $userInfo.data.idcard_file = e.detail.value;
                            }}>
                        </UploadFileField>
                    </div>
                    <div class="card-footer">
                        <ol>
                            <li>Pastikan KTP yang digunakan adalah e-KTP.</li>
                            <li>Posisikan e-KTP dengan jelas dan tidak buram.</li>
                            <li>Pastikan foto e-KTP tidak terpotong</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4 mb-3">
                <label for="selfie_file" class="form-label">ID Card File <span class="text-danger">*</span></label>
                <div class="card card-file-upload">
                    <div class="card-header">
                        {#if $userInfo.data.selfie_file}
                            <img src={images.selfie_file} class="img-fluid" alt="">
                        {/if}
                    </div>
                    <div class="card-body">
                        <h5>{$userInfo.data.selfie_file ? `${$userInfo.data.full_name} - Selfie File` : "Belum ada dokument yang diupload"}</h5>
                        <p>Foto e-KTP (format gambar: *.jpg,*.png, *.bmp)</p>
                        <UploadFileField 
                            id="selfie_file"
                            accept={[".jpg", ".jpeg", ".png"]} 
                            size={{ width: 300, height: 300 }} 
                            on:change={(e) => {
                                $userInfo.data.selfie_file = e.detail.value;
                            }}>
                        </UploadFileField>
                    </div>
                    <div class="card-footer">
                        <ol>
                            <li>Selfie tanpa ktp </li>
                            <li>Pastikan Keseluruhan muka berada di dalam area bingkai foto</li>
                            <li>Pastikan hasil foto muka terlihat jelas dan tidak berbayang atau gelap</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4 mb-3">
                <label for="signature_file" class="form-label">Signature File <span class="text-danger">*</span></label>
                <div class="card card-file-upload">
                    <div class="card-header">
                        {#if $userInfo.data.signature_file}
                            <img src={images.signature_file} class="img-fluid" alt="">
                        {/if}
                    </div>
                    <div class="card-body">
                        <h5>{$userInfo.data.signature_file ? `${$userInfo.data.full_name} - Signature File` : "Belum ada dokument yang diupload"}</h5>
                        <p>Foto e-KTP (format gambar: *.jpg,*.png, *.bmp)</p>
                        <UploadFileField 
                            id="signature_file"
                            accept={[".jpg", ".jpeg", ".png"]} 
                            size={{ width: 300, height: 300 }} 
                            on:change={(e) => {
                                $userInfo.data.signature_file = e.detail.value;
                            }}>
                        </UploadFileField>
                    </div>
                    <div class="card-footer">
                        <ol>
                            <li>Tanda tangan di kertas putih (HVS), jangan menggunakan kertas bergaris atau berpetak atau tanda tangan buku tabungan.</li>
                            <li>Pastikan tanda tangan sesuai dengan tanda tangan Anda di e-KTP.</li>
                            <li>Pastikan foto tanda tangan tidak terpotong atau kurang jelas (buram).</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="nav-button d-flex justify-content-between my-3">
        <button type="button" class="btn btn-secondary btn-sm"><i class="bi bi-arrow-left"></i> Kembali</button>
        <button type="submit" class="btn btn-primary btn-sm text-white">Selanjutnya <i class="bi bi-arrow-right"></i></button>
    </div>
</form>

<style lang="scss" scoped>

    form {
        transition: all 0.3s ease-in-out;
    }
    .cif-content  {
        max-height: 75vh;
        width: 100%;
        padding: 0.8rem;
        margin: 0;
        border: none;
        overflow-y: auto;

        .card-file-upload {
            height: 100%;
            border: 3px dotted #dce3e9;

            .card-header {
                border: none;
                background-color: #FFF;
                img {
                    width: 100%;
                    height: 100%;
                    padding: 10px 2rem;
                }
            }

            .card-body {
                background-color: #FFF;
                text-align: center;
                padding: 0 1rem;
                border: none;
                h5 {
                    font-weight: 600;
                    font-size: 1.1rem;
                }
                p {
                    font-size: 12px;
                    color: #999;
                }
            }

            .card-footer {
                background-color: #FFF;
                padding: 0;
                border: none;
                margin-top: -1rem;
                line-height: 1.5rem;
                ol {
                    text-align: center;
                    list-style-position: inside;
                    li {
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
        }
    }
</style>