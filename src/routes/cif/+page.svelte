<script lang="ts">
    import { userInfo } from "$lib/index.js";
    import UploadFileField from "../../components/UploadFileField.svelte";

    let data = $state($userInfo.data);
    let dirty = $state(false);

    async function saveCIFFile() {
        await fetch("http://localhost:8000/api/v1/user/save-cif-file", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
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
            <div class="col-12 col-lg-6 mb-3">
                <label for="idcard_file" class="form-label">ID Card File <span class="text-danger">*</span></label>
                <div class="card">
                    <div class="card-body">
                        <img src={dirty ? data.idcard_file : `http://localhost:8000/api/v1/file/${data.idcard_file}`} class="img-fluid" alt="">
                    </div>
                    <div class="card-footer">
                        <UploadFileField 
                            id="idcard_file"
                            accept={[".jpg", ".jpeg", ".png"]} 
                            size={{ width: 324, height: 205 }} 
                            on:change={(e) => {
                                data.idcard_file = e.detail.value;
                                dirty = true;
                            }}>
                        </UploadFileField>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="selfie_file" class="form-label">ID Card File <span class="text-danger">*</span></label>
                <div class="card">
                    <div class="card-body">
                        <img src={dirty ? data.selfie_file : `http://localhost:8000/api/v1/file/${data.selfie_file}`} class="img-fluid" alt="">
                    </div>
                    <div class="card-footer">
                        <UploadFileField 
                            id="selfie_file"
                            accept={[".jpg", ".jpeg", ".png"]} 
                            size={{ width: 324, height: 205 }} 
                            on:change={(e) => {
                                data.selfie_file = e.detail.value;
                                dirty = true;
                            }}>
                        </UploadFileField>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 mb-3">
                <label for="signature_file" class="form-label">ID Card File <span class="text-danger">*</span></label>
                <div class="card">
                    <div class="card-body">
                        <img src={dirty ? data.signature_file : `http://localhost:8000/api/v1/file/${data.signature_file}`} class="img-fluid" alt="">
                    </div>
                    <div class="card-footer">
                        <UploadFileField 
                            id="signature_file"
                            accept={[".jpg", ".jpeg", ".png"]} 
                            size={{ width: 324, height: 205 }} 
                            on:change={(e) => {
                                data.signature_file = e.detail.value;
                                dirty = true;
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