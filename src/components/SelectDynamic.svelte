<script lang="ts">
  import { onMount } from "svelte";

  const { viewData, placeholder, code = "", description = "", onChange, required=false, disabled=false } = $props<{
    viewData: string;
    placeholder: string;
    code?: string;
    description?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
  }>();
  let options: { data_id: number; code: string; description: string }[] = $state([]);
  let selectedValue: string = $state("");

  $effect(() => {
    onChange(selectedValue);
  });

  // Fetch data dari API saat komponen dipasang
  onMount(async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/option/${viewData}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      if (json.result) {
        options = json.data;
      } else {
        console.error("Failed to fetch data:", json.message);
      }
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  });

</script>

<select class="form-select" bind:value={selectedValue} {required} {disabled}>
  <option value="">{placeholder}</option>
  {#each options as option}
    <option value={option.data_id}>{option.description}</option>
  {/each}
</select>

<style lang="scss" scoped>
    .form-select {
        font-size: 0.8rem;
        option {
            font-size: 0.8rem;
        }

        option[value=""] {
            color: #999;
        }
    }
    
</style>