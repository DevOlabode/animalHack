import NavBar from './NavBar';
import Footer from './Footer';

export default function PublicShell({ children }) {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-main app-main-public">{children}</main>
      <Footer />
    </div>
  );
}
