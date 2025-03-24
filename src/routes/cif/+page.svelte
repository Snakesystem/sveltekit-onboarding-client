<script lang="ts">
    import { baseUrl, userInfo } from "$lib/index.js";
    import UploadFileField from "../../components/UploadFileField.svelte";

    let data = $state($userInfo.data);
    let dirty = $state({
        idcard_file: false,
        selfie_file: false,
        signature_file: false,
        is_updated: false
    });

    async function saveCIFFile() {
        await fetch(`${baseUrl}/api/v1/user/save-cif-file`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idcard_file: data.idcard_file,
                selfie_file: data.selfie_file,
                signature_file: data.signature_file,
                is_updated: dirty.is_updated
            })
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
                <div class="card">
                    <div class="card-body">
                        <img src={dirty.idcard_file ? data.idcard_file : `${baseUrl}/upload/${data.idcard_file}`} class="img-fluid" alt="">
                    </div>
                    <div class="card-footer">
                        <UploadFileField 
                            id="idcard_file"
                            accept={[".jpg", ".jpeg", ".png"]} 
                            size={{ width: 324, height: 205 }} 
                            on:change={(e) => {
                                data.idcard_file = e.detail.value;
                                dirty.idcard_file = true;
                                dirty.is_updated = true;
                            }}>
                        </UploadFileField>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4 mb-3">
                <label for="selfie_file" class="form-label">ID Card File <span class="text-danger">*</span></label>
                <div class="card">
                    <div class="card-body">
                        <img src={dirty.selfie_file ? data.selfie_file : `${baseUrl}/upload/${data.selfie_file}`} class="img-fluid" alt="">
                    </div>
                    <div class="card-footer">
                        <UploadFileField 
                            id="selfie_file"
                            accept={[".jpg", ".jpeg", ".png"]} 
                            size={{ width: 324, height: 205 }} 
                            on:change={(e) => {
                                data.selfie_file = e.detail.value;
                                dirty.selfie_file = true;
                                dirty.is_updated = true;
                            }}>
                        </UploadFileField>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4 mb-3">
                <label for="signature_file" class="form-label">Signature File <span class="text-danger">*</span></label>
                <div class="card">
                    <div class="card-body">
                        <img src={dirty.signature_file ? data.signature_file : `${baseUrl}/upload/${data.signature_file}`} class="img-fluid" alt="">
                    </div>
                    <div class="card-footer">
                        <UploadFileField 
                            id="signature_file"
                            accept={[".jpg", ".jpeg", ".png"]} 
                            size={{ width: 324, height: 205 }} 
                            on:change={(e) => {
                                data.signature_file = e.detail.value;
                                dirty.signature_file = true;
                                dirty.is_updated = true;
                            }}>
                        </UploadFileField>
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
    }
</style>