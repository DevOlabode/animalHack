import NavBar from './NavBar';

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
