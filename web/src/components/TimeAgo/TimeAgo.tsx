import React, { useState, useEffect } from 'react';

import { timeAgo } from '@/web/lib/utils';

interface TimeAgoProps {
  dateTime: string | Date;
}

function TimeAgo({ dateTime }: TimeAgoProps) {
  const [friendlyDate, setFriendlyDate] = useState(null);

  // don't render anything server-side so content matches when hydrating
  useEffect(() => {
    setFriendlyDate(timeAgo(dateTime));
  }, [dateTime]);

  if (!friendlyDate) {
    return null;
  }

  return <time dateTime={String(dateTime)}>{friendlyDate}</time>;
}

export default TimeAgo;
