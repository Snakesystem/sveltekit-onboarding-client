// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            session: {
                email: string;
                fullname: string;
                mobile_phone: string;
                bank_account_number: string;
                bank_name: string;
                bank_account_holder: string;
                question_rdn: number;
                sales: number;
                referral: number;
                client_category: number;
                disabled: boolean;
                picture: string;
            } | null;
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
