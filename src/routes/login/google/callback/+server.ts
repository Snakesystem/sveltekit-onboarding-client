import { generateSessionToken, createSession, setSessionTokenCookie } from "../../../../lib/index.js";
import { decodeIdToken } from "arctic";

import type { RequestEvent } from "@sveltejs/kit";
import type { OAuth2Tokens } from "arctic";
import { google } from "$lib/index.js";

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get("code");
	const state = event.url.searchParams.get("state");
	const storedState = event.cookies.get("google_oauth_state") ?? null;
	const codeVerifier = event.cookies.get("google_code_verifier") ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const claims: any = decodeIdToken(tokens.idToken());
	const googleUserId = claims.sub;
	const username = claims.name;

	// TODO: Replace this with your own DB query.
	const existingUser: any = await getUserFromGoogleId(googleUserId);

	if (existingUser !== null) {
		const sessionToken = generateSessionToken();
		const session: any = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/"
			}
		});
	}

	// TODO: Replace this with your own DB query.
	const user: any = await createUser(googleUserId, username);

	const sessionToken = generateSessionToken();
	const session: any = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);
	return new Response(null, {
		status: 302,
		headers: {
			Location: "/"
		}
	});
}
function getUserFromGoogleId(googleUserId: any) {
    throw new Error("Function not implemented.");
}

function createUser(googleUserId: any, username: any) {
    throw new Error("Function not implemented.");
}

