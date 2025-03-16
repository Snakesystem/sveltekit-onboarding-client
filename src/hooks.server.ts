import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    try {
        const res = await fetch('http://localhost:8000/api/v1/auth/session', {
            credentials: 'include',
            headers: {
                cookie: event.request.headers.get('cookie') || ''
            }
        });

        const data = await res.json();

        if (data.result) {
            event.locals.session = data.data; // Simpan data user di `locals.session`
        } else {
            event.locals.session = null;
        }
    } catch (error) {
        event.locals.session = null;
    }

    // Redirect user jika mencoba akses halaman dilindungi tanpa login
    const protectedRoutes = ['/', '/profile'];
    if (protectedRoutes.includes(event.url.pathname) && !event.locals.session) {
        return new Response(null, {
            status: 303,
            headers: { location: '/login' }
        });
    }

    return await resolve(event);
};
