<script lang="ts">
    import * as arctic from "arctic";
    let tokens: any = "fsdfsdfsdfsdfsdfsd";
    // @ts-ignore
    const github = new arctic.Facebook("GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET");

    const state = arctic.generateState();
    const scopes = ["user:email"];
    const authorizationURL: any = github.createAuthorizationURL(state, scopes);

    async function login(code: string) {
        tokens = await github.validateAuthorizationCode(code);
    }
    
    // const accessToken = tokens.accessToken();
</script>

<a class="btn w-100" target="_blank" href={authorizationURL}>Login with Facebook</a>

<style lang="scss" scoped>
    .btn {
        border: 1px solid #202020;
    }
</style>