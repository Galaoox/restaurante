export default function AdminLayout({ children }: any) {
    return (
        <div>
            <header>Header del Administrador</header>
            <main>{children}</main>
            <footer>Footer del Administrador</footer>
        </div>
    );
}