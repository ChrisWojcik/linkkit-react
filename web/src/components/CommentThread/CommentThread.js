import { useMemo, createContext, useContext } from 'react';

import Comment from '@/components/Comment';

import styles from './CommentThread.module.scss';

export const CommentThreadContext = createContext({
  byId: {},
  directReplies: [],
});

function CommentThread({ comments }) {
  return (
    <CommentThreadContext.Provider value={comments}>
      <DirectReplies />
    </CommentThreadContext.Provider>
  );
}

function DirectReplies() {
  const { directReplies } = useContext(CommentThreadContext);

  return useMemo(() => {
    if (!directReplies || !directReplies.length) {
      return null;
    }

    return (
      <ul className={styles.commentThread}>
        {directReplies.map((id) => (
          <li className={styles.directReply} key={id}>
            <DirectReply id={id} />
          </li>
        ))}
      </ul>
    );
  }, [directReplies]);
}

function DirectReply(props) {
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

export default CommentThread;
