/// <reference types="@sveltejs/kit" />

declare module "*.svelte" {
	import { SvelteComponent } from "svelte";
	export default class extends SvelteComponent {}
}