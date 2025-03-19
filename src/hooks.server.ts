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
            event.locals.is_authenticated = false;
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        event.locals.session = null;
    }

    // Redirect user jika mencoba akses halaman dilindungi tanpa login
    const protectedRoutes = [
        '/', '/profile', '/cif', '/cif/data-pribadi', 
        '/cif/data-pekerjaan', '/cif/data-bank', '/cif/data-pendukung'
    ];

    const publicRoutes = [
        '/login', '/register', '/forget-password'
    ];

    // Dapatkan path URL
    const path = event.url.pathname;

    // Handle route dengan parameter dinamis
    const isResetPassword = path.startsWith('/reset-password/');
    const isChangePassword = path.startsWith('/change-password');
    const isActivation = path.startsWith('/activation');

    // Redirect jika user sudah login dan mencoba akses halaman public
    if ((publicRoutes.includes(path) || isResetPassword || isChangePassword || isActivation) && event.locals.session) {
        console.log('🚫 Redirect ke home:', path);
        return new Response(null, { status: 303, headers: { location: '/' } });
    }

    if (protectedRoutes.includes(path) && !event.locals.session) {
        console.log('🔒 Redirect ke login:', path);
        return new Response(null, { status: 303, headers: { location: '/login' } });
    }

    return await resolve(event);
};