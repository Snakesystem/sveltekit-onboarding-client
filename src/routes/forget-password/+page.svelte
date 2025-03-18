<script>
  import MainContext from "../../components/MainContext.svelte";

  export let data;

</script>

<MainContext data={data}>
    <div class="card">
        <h1>Forget Password</h1>
    </div>
</MainContext>

<style lang="scss" scoped>
    .card {
        border: none;
        display: flex;
        flex-direction: column; 
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }
</style>