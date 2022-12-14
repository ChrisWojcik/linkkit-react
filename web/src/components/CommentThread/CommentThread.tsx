import React, { useMemo, createContext, useContext } from 'react';
import { NormalizedComments } from '@/web/lib/api';
import { CurrentUserContext } from '@/web/lib/auth';
import CommentForm from '@/web/components/CommentForm';
import Comment from '@/web/components/Comment';

import './CommentThread.scss';

export const CommentThreadContext = createContext<NormalizedComments>({
  byId: {},
  directReplies: [],
});

interface CommentThreadProps {
  postId: number;
  comments: NormalizedComments;
}

export default function CommentThread({
  comments,
  postId,
}: CommentThreadProps) {
  const { isAuthenticated } = useContext(CurrentUserContext);

  return (
    <CommentThreadContext.Provider value={comments}>
      {isAuthenticated && (
        <CommentForm className="mb-s" isFocal={true} postId={postId} />
      )}
      <DirectReplies />
    </CommentThreadContext.Provider>
  );
}

function DirectReplies() {
  const { directReplies } = useContext(CommentThreadContext);

  // only re-render when there is a new directReply id in the array
  return useMemo(() => {
    if (!directReplies || !directReplies.length) {
      return null;
    }

    return (
      <ul className="comment-thread">
        {directReplies.map((id) => (
          <li className="comment-thread__direct-reply" key={id}>
            <DirectReply id={id} />
          </li>
        ))}
      </ul>
    );
  }, [directReplies]);
}

function DirectReply(props: { id: number }) {
  const { byId } = useContext(CommentThreadContext);
  const { id, postId, parentId, text, user, createdAt } = byId[props.id];

  // only re-render when data changes
  return useMemo(
    () => <Comment comment={byId[props.id]} />,
    [id, postId, parentId, text, user, createdAt] // eslint-disable-line react-hooks/exhaustive-deps
  );
}
