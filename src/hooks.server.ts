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
            event.locals.is_authenticated = data.result;
            event.locals.session = data.data; // Simpan data user di `locals.session`
        } else {
            event.locals.session = null;
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        event.locals.session = null;
    }

    // Redirect user jika mencoba akses halaman dilindungi tanpa login
    const protectedRoutes = ['/', '/profile', '/cif', '/cif/data-pribadi', '/cif/data-pekerjaan', '/cif/data-bank', '/cif/data-pendukung'];
    const publicRoutes = ['/login', '/register', '/forget-password' ];
    if (protectedRoutes.includes(event.url.pathname) && !event.locals.session) {
        return new Response(null, {
            status: 303,
            headers: { location: '/login' }
        });
    } else if (publicRoutes.includes(event.url.pathname) && event.locals.session) {
        return new Response(null, {
            status: 303,
            headers: { location: '/' }
        });
    }

    return await resolve(event);
};
