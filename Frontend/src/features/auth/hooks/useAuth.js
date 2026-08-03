import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading, error, setError } = context;


    const handleLogin = async ({ email, password }) => {

        setLoading(true);
        setError("");

        try {
            const data = await login({ email, password });

            setUser(data.user);
            setError("");

            return true;

        } catch (err) {
            setError(err.message);

            return false;

        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {

        setLoading(true)
        setError("");

        try {
            const data = await register({ username, email, password })

            setUser(data.user)
            setError("");

            return true;

        } catch (err) {
            setError(err.message);

            return false;

        } finally {
            setLoading(false)
        }
    }

    const clearError = () => {
        setError("");
    }

    const handleLogout = async () => {

        setLoading(true)

        try {
            const data = await logout()

            if (!data) return;

            setUser(null)

        } catch (err) {
            console.log(err)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()

                if (!data) return;

                setUser(data.user)

            } catch (err) {
                console.log(err)

            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])

    return { user, loading, error, handleRegister, handleLogin, handleLogout, clearError }
}