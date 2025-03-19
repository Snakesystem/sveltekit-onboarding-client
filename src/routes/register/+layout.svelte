<script lang="ts">
  import { TabContent, TabPane } from "@sveltestrap/sveltestrap";
  import MainContext from "../../components/MainContext.svelte";
  import Faq from "../../components/Faq.svelte";

  export let data;
</script>

<MainContext data={data}>
    <div class="card container">
        <TabContent pills>
            <TabPane tabId="faq" tab="Faq" active>
              <div class="card m-3">
                <Faq/>
              </div>
            </TabPane>
            <TabPane tabId="resgiter" tab="Pendaftaran">
              <div class="card m-3">
                <slot />
              </div>
            </TabPane>
        </TabContent>
    </div>
</MainContext>

<style lang="css" scoped>
    .card {
        border: none;
    }
</style>