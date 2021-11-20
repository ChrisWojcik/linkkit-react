import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '@/components/Button';
import { IconGitHub } from '@/components/icons';

import styles from './MainNav.module.scss';

const ESCAPE_KEY = 27;

function MainNav() {
  const $el = useRef(null);
  const $menuToggle = useRef(null);
  const $menu = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function restrictFocus(e) {
    if (
      document !== e.target &&
      $el.current !== e.target &&
      !$el.current.contains(e.target)
    ) {
      $el.current.focus();
    }
  }

  function handleKeydown(e) {
    if (e.keyCode && e.keyCode === ESCAPE_KEY) {
      setMenuOpen(false);
    }
  }

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleOpen() {
      document.body.classList.add(styles.isOpen);
      document.addEventListener('focusin', restrictFocus, false);
      document.addEventListener('keydown', handleKeydown, false);
      $menu.current.scrollTop = 0;
    }

    function handleClose() {
      document.body.classList.remove(styles.isOpen);
      document.removeEventListener('focusin', restrictFocus, false);
      document.removeEventListener('keydown', handleKeydown, false);

      if ($menuToggle.current) {
        $menuToggle.current.focus();
      }
    }

    handleOpen();
    return handleClose;
  }, [menuOpen]);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpen(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div ref={$el} className={styles.mainnav} tabIndex="-1">
      <div className={styles.navbar}>
        <Link href="/">
          <a className={styles.logo}>Linkkit</a>
        </Link>
        <button
          ref={$menuToggle}
          className={styles.menuToggle}
          type="button"
          aria-label="Toggle Navigation"
          aria-controls="mainnav__menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={styles.menuToggleIcon} />
        </button>
      </div>
      <nav
        ref={$menu}
        className={styles.menu}
        id="mainnav__menu"
        aria-label="Primary Navigaion"
      >
        <div className={styles.menuContainer}>
          <ul className={styles.menuList}>
            <li className={styles.menuListItem}>
              <a
                href="https://github.com/ChrisWojcik/linkkit-react"
                className={styles.menuListLink}
                rel="noreferrer noopener nofollow"
                target="_blank"
              >
                About
              </a>
            </li>
          </ul>
          <Button
            href={`/auth/github`}
            className={styles.menuBtn}
            rounded
            block
            icon={<IconGitHub />}
          >
            Sign in with GitHub
          </Button>
        </div>
        {menuOpen && (
          <div
            className={styles.menuBackdrop}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </nav>
    </div>
  );
}

export default MainNav;
