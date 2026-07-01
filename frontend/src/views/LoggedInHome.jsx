import Navbar from '../components/NavBar';

function LoggedInHome() {
    return (
        <div>
            <section>{<Navbar />}</section>
            <h2>Logged In Into The App</h2>
        </div>
    )
}

export default LoggedInHome;