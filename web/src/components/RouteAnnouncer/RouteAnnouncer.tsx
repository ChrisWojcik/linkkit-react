import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/*
 * Watches for changes to document.title to simulate page navigation
 *
 * when it changes: announces the new title for screen readers and
 * moves focus to the top of the page (while preventing scroll)
 */
export default function RouteAnnouncer() {
  const isInitialPage = useRef(true);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const location = useLocation();
  const $pageTopFocusMarker = useRef(null);

  useEffect(() => {
    // don't announce the page on initial load, only on
    // subsequent navigations
    if (isInitialPage.current) {
      isInitialPage.current = false;
      return;
    }

    const $title = document.querySelector('title');

    if (!$title) {
      return;
    }

    const observer = new MutationObserver(() => {
      setAnnouncement(document.title);
    });

    observer.observe($title, {
      childList: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [location]);

  useEffect(() => {
    if (!announcement) {
      return;
    }

    const scrollPosition = window.pageYOffset;

    $pageTopFocusMarker.current.focus();
    window.scrollTo(0, scrollPosition);
  }, [announcement]);

  return (
    <div id="__route-announcer__">
      <div
        className="sr-only"
        ref={$pageTopFocusMarker}
        tabIndex={-1}
        aria-hidden={true}
      />
      {announcement && (
        <p className="sr-only" role="alert">
          {announcement}
        </p>
      )}
    </div>
  );
}
