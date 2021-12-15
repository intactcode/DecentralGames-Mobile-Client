import Link from 'next/link';
// import styles from '../styles/Home.module.css';

const Hamburger = () => {
  return (
    <nav role="navigation">
      <div id="menuToggle">
        {/* A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it. */}

        <input type="checkbox" />

        {/* Some spans to act as a hamburger.
    
    They are acting like a real hamburger,
    not that McDonalds stuff. */}

        <span></span>
        <span></span>
        <span></span>

        {/* Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic. */}

        <ul id="menu">
          <Link href="/" passHref>
            <h2>Lobby</h2>
          </Link>

          <Link href="/gameplay" passHref>
            <h2>New Table</h2>
          </Link>

          <Link href="/" passHref>
            <h2>Player Stats</h2>
          </Link>

          <Link href="/" passHref>
            <h2>Daily Leaderboard</h2>
          </Link>

          <Link href="/" passHref>
            <h2>ICE Challenges</h2>
          </Link>

          <Link href="/" passHref>
            <h2>Settings</h2>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Hamburger;
