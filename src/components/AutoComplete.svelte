<script lang="ts">
    import { onDestroy } from "svelte";
    import { writable } from "svelte/store";

    const { placeholder="", onChange=() => {} } = $props<{ 
        placeholder?: string;
        onChange?: (value: string) => void;
     }>();

    let value = $state("");

    let filteredOptions = writable<any>([]); // Data dari API
    let showOptions = writable(false);
    let timeoutId: number | null = null;
    let abortController: AbortController | null = null;

    async function fetchCities(query: string) {
        if (!query) {
            filteredOptions.set([]);
            return;
        }

        // Batalkan request sebelumnya jika masih berjalan
        if (abortController) {
            abortController.abort();
        }
        abortController = new AbortController();

        try {
            const response = await fetch(`http://localhost:8000/api/v1/option/city/${query}`, {
                signal: abortController.signal,
                credentials: "include",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) throw new Error("Gagal mengambil data");

            const result = await response.json();
            if (result.result) {
                filteredOptions.set(result.data);
                showOptions.set(result.data.length > 0);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    function onInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;

        // Hapus request sebelumnya jika user masih mengetik
        if (timeoutId) clearTimeout(timeoutId);

        // Tunggu 1 detik setelah user berhenti mengetik sebelum fetch data
        timeoutId = setTimeout(() => {
            fetchCities(value);
        }, 1000);
    }

    function selectOption(option: any) {
        value = option.data_id;
        showOptions.set(false);
    }

    onDestroy(() => {
        if (abortController) abortController.abort();
    });

    $effect(() => {
        onChange(value);
    });
</script>

<div class="autocomplete">
    <input
        type="text"
        class="input"
        bind:value
        oninput={onInput}
        placeholder={placeholder}
    />

    {#if $showOptions}
        <ul class="options">
            {#each $filteredOptions as option}
                <li onclick={() => selectOption(option)}>{option.description}</li>
            {/each}
        </ul>
    {/if}
</div>

<style>
    .autocomplete {
        position: relative;
        width: 100%;
    }

    .input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .options {
        position: absolute;
        width: 100%;
        background: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        max-height: 150px;
        overflow-y: auto;
        margin-top: 4px;
        list-style: none;
        padding: 0;
        z-index: 99;
    }

    .options li {
        padding: 8px;
        cursor: pointer;
    }

    .options li:hover {
        background: #f0f0f0;
    }
</style>
