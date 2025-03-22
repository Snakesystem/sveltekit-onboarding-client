<script>
// @ts-nocheck

    import { createEventDispatcher } from 'svelte';
  
    const { accept = [], size = { width: 324, height: 205 }, value = null, id="" } = $props();
    let fileInputRef = $state(null);
    let error = $state(null);
    const dispatch = createEventDispatcher();
  
    /**
   * @param {Blob} file
   * @param {number} width
   * @param {number} height
   */
    function resizeImage(file, width, height) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/png'));
            } else {
              reject('Canvas context is null');
            }
          };
          img.onerror = reject;
          img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  
    function handleFileValidationAndRead(event) {
      const file = event.target.files?.[0] || null;
      if (!file) return;
  
      const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
      if (!accept.includes(fileExt)) {
        error = `Invalid file type. Allowed types: ${accept.join(', ')}`;
        dispatch('change', { value: null });
        return;
      }
  
      resizeImage(file, size.width, size.height)
        .then((resizedDataUrl) => {
          error = null;
          dispatch('change', { value: resizedDataUrl });
        })
        .catch(() => {
          error = 'Error resizing the image';
          dispatch('change', { value: null });
        });
    }
  </script>
  
  <div class="mb-3 input-file-upload">
    <button
      class="file-upload-wrapper {error ? 'has-error' : ''}"
      onclick={() => fileInputRef.click()}
    >
      <input
        bind:this={fileInputRef}
        type="file"
        accept={accept.join(',')}
        class="file-upload-input d-none"
        onchange={handleFileValidationAndRead}
      />
      <div class="file-upload-content">
        <i class="bi bi-upload file-upload-icon"></i>
        <span class="file-upload-text">Choose a file</span>
      </div>
    </button>
    {#if error}
      <p class="error-text">{error}</p>
    {/if}
  </div>
  
  <style>
    .file-upload-wrapper {
      border: 2px dashed #ccc;
      padding: 10px;
      text-align: center;
      cursor: pointer;
      width: 100%;
    }
    .has-error {
      border-color: red;
    }
    .error-text {
      color: red;
      font-size: 0.9rem;
    }
  </style>
  