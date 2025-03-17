import type { LayoutServerLoad } from "./$types.js";

export const load: LayoutServerLoad = async ({ locals }) => {
    return { 
        session: locals.session, 
        is_authenticated: locals.is_authenticated,
     };
};