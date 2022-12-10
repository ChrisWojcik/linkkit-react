import React, { useState, useEffect } from 'react';

/*
 * Watches for changes to document.title to simulate page navigation
 *
 * when it changes: announces the new title for screen readers and
 * moves focus to the new page's h1, with a fallback to the #app container
 */
export default function RouteAnnouncer() {
  const [announcement, setAnnouncement] = useState<string | null>(null);

  useEffect(() => {
    const title = document.querySelector('title');

    if (!title) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (document.title !== announcement) {
        setAnnouncement(document.title);
      }
    });

    observer.observe(title, {
      childList: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!announcement) {
      return;
    }

    const titleElement = document.querySelector('h1');
    const appContainer = document.querySelector('#app') as HTMLElement | null;

    if (titleElement && titleElement.hasAttribute('tabindex')) {
      titleElement.focus();
      return;
    }

    if (appContainer && appContainer.hasAttribute('tabindex')) {
      appContainer.focus();
    }
  }, [announcement]);

  if (!announcement) {
    return null;
  }

  return (
    <div
      id="__route-announcer__"
      className="sr-only"
      role="alert"
      aria-live="assertive"
    >
      {announcement}
    </div>
  );
}
