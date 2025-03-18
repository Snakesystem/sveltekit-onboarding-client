<script>
  import Header from "./Header.svelte";

  export let data;

  console.log(data.session)

</script>
<div class="main-content">
    <Header session={data.session}/>
    <div class="box">
        <slot />
    </div>
</div>

<style lang="scss" scoped>
    
</style>