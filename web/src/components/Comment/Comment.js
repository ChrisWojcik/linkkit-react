import { useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { CommentThreadContext } from '@/components/CommentThread';
import CommentForm from '@/components/CommentForm';
import TimeAgo from '@/components/TimeAgo';
import Button from '@/components/Button';
import { IconComment } from '@/components/icons';

import styles from './Comment.module.scss';

function Comment(props) {
  const [isShowingReplyForm, setIsShowingReplyForm] = useState(false);

  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <p className={styles.meta}>
          <span className={styles.metaAuthor}>u/</span>
          <span aria-hidden="true" className={styles.metaSeparator}>
            •
          </span>
          <TimeAgo dateTime={props.createdAt} />
        </p>
      </div>
      <div className={styles.body}>
        <p className={styles.text}>{props.text}</p>
      </div>
      <div className={styles.footer}>
        <Button
          className={styles.footerButton}
          variant="white"
          size="small"
          icon={<IconComment />}
          onClick={() => setIsShowingReplyForm(true)}
        >
          Reply
        </Button>
      </div>
      {isShowingReplyForm && (
        <div className={classNames(styles.reply, styles.replyForm)}>
          <CommentForm
            onCancel={() => setIsShowingReplyForm(false)}
            onSuccess={() => setIsShowingReplyForm(false)}
            postId={props.postId}
            parentId={props.id}
          />
        </div>
      )}
      <CommentReplies parentId={props.id} />
    </div>
  );
}

function CommentReplies(props) {
  const { byId } = useContext(CommentThreadContext);
  const replies = byId[props.parentId].replies;

  return useMemo(() => {
    if (!replies || !replies.length) {
      return null;
    }

    return (
      <ul className={styles.replies}>
        {replies.map((id) => (
          <li className={styles.reply} key={id}>
            <CommentReply id={id} />
          </li>
        ))}
      </ul>
    );
  }, [replies]);
}

function CommentReply(props) {
  const { byId } = useContext(CommentThreadContext);
  const { id, postId, parentId, text, createdAt } = byId[props.id];

  return useMemo(
    () => (
      <Comment
        id={id}
        postId={postId}
        parentId={parentId}
        text={text}
        createdAt={createdAt}
      />
    ),
    [id, postId, parentId, text, createdAt]
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Comment;
