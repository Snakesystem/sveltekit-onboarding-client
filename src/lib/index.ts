/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Reexport your entry components here
import { writable } from "svelte/store";

export const userInfoData = {
    autonid: 0,
    stage: 0,
    client_id: "",
    cif_id: "",
    is_revised: false,
    is_rejected: false,
    is_finished: true,
    account_status: 0,
    mobile_phone: "",
    email: "",
    full_name: "",
    spouse_relationship: 0,
    spouse_name: "",
    mother_name: "",
    nationality: 0,
    idcard_country: "",
    idcard_number: "",
    idcard_expire_date: "",
    sex: 0,
    birth_place: "",
    birth_date: "",
    birth_country: "",
    religion: 0,
    marital_status: 0,
    education: 0,
    education_text: "",
    idcard_city: 0,
    idcard_district: "",
    idcard_subdistrict: "",
    idcard_rt: "",
    idcard_rw: "",
    idcard_zipcode: "",
    idcard_address: "",
    copy_id: false,
    domicile_city: 0,
    domicile_district: "",
    domicile_subdistrict: "",
    domicile_rt: "",
    domicile_rw: "",
    domicile_address: "",
    domicile_zipcode: "0",
    question_rdn: 0,
    bank_name: "",
    bank_branch: "",
    bank_account_number: "",
    bank_account_holder: "",
    question_npwp: 0,
    npwp_number: "",
    npwp_reason: "",
    company_name: "",
    fund_source: "0",
    fund_source_text: "",
    occupation: 0,
    occupation_text: "",
    nature_bussiness: 0,
    nature_bussiness_text: "",
    position: 0,
    position_text: "",
    income_peranum: 0,
    question_1: false,
    question_1text: "",
    question_2: false,
    question_2text: "",
    question_3: false,
    question_3text: "",
    question_4: false,
    question_4text: "",
    question_5: false,
    question_5text: "",
    question_6: false,
    question_6text: "",
    invesment_objective: 0,
    risk: 1,
    question_fatca: "",
    fatca_1: "",
    fatca_2: "",
    fatca_3: "",
    spouse_income_peranum: 0,
    spouse_occupation: 0,
    spouse_occupation_text: "",
    spouse_position: 0,
    spouse_nature_bussiness: 0,
    spouse_fund_source: "",
    spouse_fund_source_text: "",
    spouse_company_name: "",
    spouse_company_city: 0,
    spouse_company_address: "",
    spouse_company_zipcode: "",
    idcard_file: "",
    selfie_file: "",
    signature_file: "",
    npwp_file: "",
    sales: 0,
    company_city: 0,
    company_address: "",
    company_zipcode: "",
    beneficiary_owner: 0,
    residence_status: 0
}

export const userInfo = writable(
    {
        result: false,
        data: userInfoData,
        message: "",
        error: null
    }
)

export function getInitials(name: string = ""): string {
    const words = name.trim().split(/\s+/); // Pisahkan berdasarkan spasi
    if (words.length === 1) {
        return words[0][0]?.toUpperCase(); // Jika hanya satu kata, ambil huruf pertama
    }
    return words.map(word => word[0]?.toUpperCase()).join(""); // Ambil huruf pertama dari tiap kata
}

import { Google } from "arctic";
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";

export const google = new Google(
	"GOOGLE_CLIENT_ID",
	"GOOGLE_CLIENT_SECRET",
	"http://localhost:5173/login/google/callback"
);

export function generateSessionToken(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

export function createSession(sessionToken: string, id: any) {
    const session = {
        session_token: sessionToken,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
    return session;
}

export function setSessionTokenCookie(event: RequestEvent<Partial<Record<string, string>>, string | null>, sessionToken: string, expiresAt: any) {
    document.cookie = `session_token=${sessionToken}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=Strict; Secure; HttpOnly; SameSite=None;`;
}

export function validPassword(node: HTMLInputElement) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "invalid-feedback";
  
    function inputHandler() {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (regex.test(node.value)) {
            node.classList.remove("is-invalid");
            errorMessage.textContent = "";
        } else {
            node.classList.add("is-invalid");
            errorMessage.textContent = "Password minimal 8 karakter, terdiri dari huruf besar, huruf kecil, dan angka!";
            node.parentNode?.appendChild(errorMessage);
        }
    }
  
    node.addEventListener("input", inputHandler);
  
    return {
      destroy() {
        node.removeEventListener("input", inputHandler);
        errorMessage.remove();
      },
    };
}

export function confirmPassword(node: HTMLInputElement, { password }: { password: string }) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "invalid-feedback";

    function inputHandler() {
        if (node.value && node.value !== password) {
            node.classList.add("is-invalid");
            errorMessage.textContent = "Password tidak cocok!";
            node.parentNode?.appendChild(errorMessage);
        } else {
            node.classList.remove("is-invalid");
            errorMessage.textContent = "";
        }
    }

    node.addEventListener("input", inputHandler);

    return {
        update({ password: newPassword }: { password: string }) {
            password = newPassword;
        },
        destroy() {
            node.removeEventListener("input", inputHandler);
            errorMessage.remove();
        }
    };
}

export function validPhone(node: HTMLInputElement) {
    const errorMessage = document.createElement("div");
    errorMessage.className = "invalid-feedback";

    function inputHandler() {
        if (!node.value.startsWith("62")) {
            node.classList.add("is-invalid");
            errorMessage.textContent = "Nomor telepon harus diawali dengan 62!";
            node.parentNode?.appendChild(errorMessage);
        } else {
            node.classList.remove("is-invalid");
            errorMessage.textContent = "";
        }
    }

    node.addEventListener("input", inputHandler);

    return {
        destroy() {
            node.removeEventListener("input", inputHandler);
            errorMessage.remove();
        }
    };
}

export function formatDate(datetime: string) {
    return datetime.split(" ")[0]; // Ambil hanya YYYY-MM-DD
  }