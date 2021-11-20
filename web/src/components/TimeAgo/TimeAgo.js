import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import timeAgo from '@/lib/timeAgo';

function TimeAgo({ dateTime }) {
  const [friendlyDate, setFriendlyDate] = useState(null);

  // don't render anything server-side so content matches when hydrating
  useEffect(() => {
    setFriendlyDate(timeAgo(dateTime));
  }, [dateTime]);

  if (!friendlyDate) {
    return null;
  }

  return <time dateTime={dateTime}>{friendlyDate}</time>;
}

TimeAgo.propTypes = {
  dateTime: PropTypes.string.isRequired,
};

export default TimeAgo;
