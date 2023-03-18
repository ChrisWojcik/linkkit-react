import React, { useState, useContext, useMemo, useRef } from 'react';
import { AuthContext } from '@/web/lib/auth';
import { CommentThreadContext } from '@/web/components/CommentThread';
import TimeAgo from '@/web/components/TimeAgo';
import Button from '@/web/components/Button';
import CommentForm from '@/web/components/CommentForm';
import { IconComment } from '@/web/components/icons';
import { CommentWithNormalizedReplies } from '@/web/lib/api';

import './Comment.scss';

interface CommentProps {
  comment: CommentWithNormalizedReplies;
}

export default function Comment({ comment }: CommentProps) {
  const { isAuthenticated } = useContext(AuthContext);
  const [isShowingReplyForm, setIsShowingReplyForm] = useState(false);

  const $replyButton = useRef(null);

  const { id, text, createdAt, user, postId } = comment;

  function hideReplyForm() {
    setIsShowingReplyForm(false);

    if ($replyButton.current) {
      $replyButton.current.focus();
    }
  }

  return (
    <div className="comment">
      <div className="comment__header">
        <p className="comment__meta">
          <span className="comment__meta-author">u/{user.username}</span>
          <span aria-hidden="true" className="comment__meta-separator">
            •
          </span>
          <TimeAgo dateTime={createdAt} />
        </p>
      </div>
      <div className="comment__body">
        <p className="comment__text">{text}</p>
      </div>
      {isAuthenticated && (
        <div className="comment__footer">
          <Button
            ref={$replyButton}
            className="comment__footer-button"
            variant="white"
            size="small"
            icon={<IconComment />}
            onClick={() => setIsShowingReplyForm(true)}
          >
            Reply
          </Button>
        </div>
      )}
      {isShowingReplyForm && isAuthenticated && (
        <div className="comment__reply comment__reply-form">
          <CommentForm
            onCancel={hideReplyForm}
            onSuccess={hideReplyForm}
            postId={postId}
            parentId={id}
          />
        </div>
      )}
      <CommentReplies parentId={id} />
    </div>
  );
}

function CommentReplies(props: { parentId: number }) {
  const { byId } = useContext(CommentThreadContext);
  const replies = byId[props.parentId].replies;

  // only re-render when there is a new reply id in the array
  return useMemo(() => {
    if (!replies || !replies.length) {
      return null;
    }

    return (
      <ul className="comment__replies">
        {replies.map((id: number) => (
          <li className="comment__reply" key={id}>
            <CommentReply id={id} />
          </li>
        ))}
      </ul>
    );
  }, [replies]);
}

function CommentReply(props: { id: number }) {
  const { byId } = useContext(CommentThreadContext);
  const { id, postId, parentId, text, user, createdAt } = byId[props.id];

  // only re-render when the data changes
  return useMemo(
    () => <Comment comment={byId[props.id]} />,
    [id, postId, parentId, text, user, createdAt] // eslint-disable-line react-hooks/exhaustive-deps
  );
}
