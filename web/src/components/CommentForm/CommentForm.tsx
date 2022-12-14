import React, { useState } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import Button from '@/web/components/Button';
import { FormTextArea, FormSubmit } from '@/web/components/forms';
import { useAddCommentMutation } from '@/web/lib/api';

import './CommentForm.scss';

interface CommentFormProps {
  postId: number;
  parentId?: number | null;
  isFocal?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

type AddCommentFormValues = {
  text: string;
};

export default function CommentForm({
  postId,
  parentId = null,
  isFocal = false,
  onSuccess = () => {},
  onCancel = () => {},
  className,
}: CommentFormProps) {
  const [formError, setFormError] = useState(null);
  const addComment = useAddCommentMutation();

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<AddCommentFormValues>();

  const onSubmit = async (data: AddCommentFormValues) => {
    const formData = { ...data, postId, parentId };

    try {
      setFormError(null);
      await addComment.mutateAsync(formData);

      reset({ text: '' });
      onSuccess();
    } catch (err) {
      setFormError('Something went wrong.');
    }
  };

  const formClasses = classNames(
    className,
    'comment-form',
    isFocal && 'comment-form--is-focal'
  );

  return (
    <form className={formClasses} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="comment-form__body">
        <FormTextArea
          label="What are your thoughts?"
          {...register('text', { required: true })}
          hasError={Boolean(errors.text)}
          errorMessage={errors.text?.message}
          rows={4}
        />
      </div>
      <div className="comment-form__footer">
        {!isFocal && (
          <Button
            className="comment-form__cancel-button"
            variant="secondary"
            size={isFocal ? undefined : 'small'}
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <FormSubmit
          disabled={isSubmitting || !isValid}
          size={isFocal ? undefined : 'small'}
        >
          Comment
        </FormSubmit>
        {formError && <span className="form-error">{formError}</span>}
      </div>
    </form>
  );
}
