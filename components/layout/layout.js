import { AuthContextProvider } from "@/contexts/auth-context";

export default function Layout(props) {
    return (
    <AuthContextProvider>
        <main>{props.children}</main>
    </AuthContextProvider>
    );
}