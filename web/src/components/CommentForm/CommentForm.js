import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useMutation, useQueryClient } from 'react-query';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import createDecorator from 'final-form-focus';

import Button from '@/components/Button';
import { TextField, SubmitButton } from '@/components/forms';
import { composeValidators, required, maxLength } from '@/lib/validation';

import styles from './CommentForm.module.scss';
import formStyles from '@/components/forms/forms.module.scss';

const focusOnError = createDecorator();

function CommentForm({
  postId,
  parentId,
  isFocal,
  onSuccess,
  onCancel,
  className,
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation(createComment);

  const onSubmit = async (values) => {
    const formData = { ...values, postId, parentId };

    try {
      const comment = await mutation.mutateAsync(formData);

      queryClient.setQueryData(['posts', postId], (data) => {
        let { post, comments } = data;

        post.numComments = (post.numComments || 0) + 1;

        comments = comments || { byId: {}, directReplies: [] };
        comments.byId[comment.id] = { ...comment, replies: [] };

        if (comment.parentId) {
          comments.byId[comment.parentId].replies = [
            comment.id,
            ...comments.byId[comment.parentId].replies,
          ];
        } else {
          comments.directReplies = [comment.id, ...comments.directReplies];
        }

        return { post, comments };
      });

      queryClient.invalidateQueries(['posts'], { exact: true });
    } catch (err) {
      console.error(err);
      return { [FORM_ERROR]: 'Something went wrong.' };
    }
  };

  const validateForm = (values) => {
    const errors = {
      text: composeValidators(required, maxLength(10000))(values.text),
    };

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      decorators={[focusOnError]}
      validate={validateForm}
      render={({ handleSubmit, form, invalid, submitting, submitError }) => (
        <form
          className={classNames(
            className,
            styles.commentForm,
            isFocal && styles.isFocal
          )}
          onSubmit={async (event) => {
            const error = await handleSubmit(event);

            if (!error) {
              form.restart();
              onSuccess();
            }
          }}
          noValidate
        >
          <TextField
            name="text"
            multiline
            id={`comment-form-${postId}${parentId ? `-${parentId}` : ''}__text`}
            label="What are your thoughts?"
            rows="4"
            hideErrors={true}
          />
          <div>
            {!isFocal && (
              <Button
                className={styles.cancelButton}
                variant="secondary"
                size={isFocal ? undefined : 'small'}
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <SubmitButton
              size={isFocal ? undefined : 'small'}
              disabled={(invalid && !submitError) || submitting}
            >
              Comment
            </SubmitButton>
            {submitError && (
              <span className={formStyles.formError}>{submitError}</span>
            )}
          </div>
        </form>
      )}
    />
  );
}

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  parentId: PropTypes.string,
  isFocal: PropTypes.bool,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

CommentForm.defaultProps = {
  isFocal: false,
  onSuccess: () => {},
  onCancel: () => {},
};

async function createComment(comment) {
  const res = await fetch('/api/posts.comment', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(comment),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Something went wrong.');
  }

  return json;
}

export default CommentForm;
