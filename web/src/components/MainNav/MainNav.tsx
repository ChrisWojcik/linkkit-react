import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Button from '@/web/components/Button';
import { IconGitHub, IconLogout } from '@/web/components/icons';
import { CurrentUserContext } from '@/web/lib/auth';
import { baseUrl } from '@/web/lib/utils';

import './MainNav.scss';

const ESCAPE_KEY = 27;

function MainNav() {
  const $el = useRef(null);
  const $menuToggle = useRef(null);
  const $menu = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const { isAuthenticated } = useContext(CurrentUserContext);
  const location = useLocation();

  function restrictFocus(e: FocusEvent) {
    if (
      document !== e.target &&
      $el.current !== e.target &&
      !$el.current.contains(e.target)
    ) {
      $el.current.focus();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.keyCode && e.keyCode === ESCAPE_KEY) {
      setMenuOpen(false);
    }
  }

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleOpen() {
      document.body.classList.add('main-nav-is-open');
      document.addEventListener('focusin', restrictFocus, false);
      document.addEventListener('keydown', handleKeydown, false);
      $menu.current.scrollTop = 0;
    }

    function handleClose() {
      document.body.classList.remove('main-nav-is-open');
      document.removeEventListener('focusin', restrictFocus, false);
      document.removeEventListener('keydown', handleKeydown, false);

      if ($menuToggle.current) {
        $menuToggle.current.focus();
      }
    }

    handleOpen();
    return handleClose;
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setCurrentUrl(window.location.href);
  }, [location]);

  return (
    <div ref={$el} className="main-nav" tabIndex={-1}>
      <div className="main-nav__navbar">
        <Link to="/" className="main-nav__logo">
          Linkkit
        </Link>
        <button
          ref={$menuToggle}
          className="main-nav__menu-toggle"
          type="button"
          aria-label="Toggle Navigation"
          aria-controls="main-nav__menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="main-nav__menu-toggle-icon" />
        </button>
      </div>
      <nav
        ref={$menu}
        className="main-nav__menu"
        id="main-nav__menu"
        aria-label="Primary Navigaion"
      >
        <div className="main-nav__menu-container">
          <ul className="main-nav__menu-list">
            <li className="main-nav__menu-list-item">
              <a
                href="https://github.com/ChrisWojcik/linkkit-react"
                className="main-nav__menu-list-link"
                rel="noreferrer noopener nofollow"
                target="_blank"
              >
                About
              </a>
            </li>
          </ul>
          {isAuthenticated ? (
            <Button
              href={baseUrl(
                `/auth/logout${
                  currentUrl
                    ? `?returnTo=${encodeURIComponent(currentUrl)}`
                    : ''
                }`
              )}
              className="main-nav__menu-button"
              rounded
              block
              icon={<IconLogout />}
            >
              Log out
            </Button>
          ) : (
            <Button
              href={baseUrl(
                `/auth/github${
                  currentUrl
                    ? `?returnTo=${encodeURIComponent(currentUrl)}`
                    : ''
                }`
              )}
              className="main-nav__menu-button"
              rounded
              block
              icon={<IconGitHub />}
            >
              Sign in with GitHub
            </Button>
          )}
        </div>
        {menuOpen && (
          <div
            className="main-nav__menu-backdrop"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </nav>
    </div>
  );
}

export default MainNav;
