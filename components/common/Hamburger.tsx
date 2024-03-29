import Link from 'next/link';
import { useEffect, useRef } from 'react';

const Hamburger: React.FC = () => {
  const menuRef = useRef<any>(null);

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    document.addEventListener('mouseup', function (event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        let form = document.getElementById('check');
        if (form) (form as HTMLFormElement).checked = false;
      }
    });
  }, []);

  return (
    <nav role="navigation">
      <div id="menuToggle" ref={menuRef}>
        {/* A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it. */}

        <input type="checkbox" id="check" />

        {/* Some spans to act as a hamburger.
    
    They are acting like a real hamburger,
    not that McDonalds stuff. */}

        <span></span>
        <span></span>
        <span></span>

        {/* Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic. */}

        <ul id="menu">
          {/* <Link href="/" passHref>
            <h2>Lobby</h2>
          </Link> */}

          <Link href="/join-poker" passHref>
            <h2>Play Now</h2>
          </Link>

          <Link href="/" passHref>
            <h2>Discord</h2>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Hamburger;
