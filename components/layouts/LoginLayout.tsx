export default function LoginLayout({ children }: any) {
    return (
        <div>
            <header>Header de Login</header>
            <main>{children}</main>
            <footer>Footer de Login</footer>
        </div>
    );
}