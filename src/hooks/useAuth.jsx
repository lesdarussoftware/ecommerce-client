import { AUTH_URL } from "../helpers/urls"

export function useAuth() {

    async function generateAuthToken({ account }) {
        const res = await fetch(AUTH_URL + '/generate-auth-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account })
        })
        const data = await res.json()
        return { status: res.status, data }
    }

    return { generateAuthToken }
}