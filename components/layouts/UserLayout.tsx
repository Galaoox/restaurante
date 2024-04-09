export default function UserLayout({ children }: any) {
    return (
        <div>
            <header>Header del Usuario Normal</header>
            <main>{children}</main>
            <footer>Footer del Usuario Normal</footer>
        </div>
    );
}

