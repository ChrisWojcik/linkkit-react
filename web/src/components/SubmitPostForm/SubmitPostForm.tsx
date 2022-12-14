import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import isURL from 'validator/lib/isURL';

import { FormInput, FormTextArea, FormSubmit } from '@/web/components/forms';
import { Tabs, TabList, Tab, TabPanel } from '@/web/components/Tabs';
import { IconLink, IconFileText } from '@/web/components/icons';
import { useCreatePostMutation } from '@/web/lib/api';
import { removeOriginFromUrl } from '@/web/lib/utils';

import './SubmitPostForm.scss';

type SubmitPostFormValues = {
  title: string;
  text?: string;
  sharedLink?: string;
};

export default function SubmitPostForm() {
  const [kind, setKind] = useState<string | number>('post');
  const [formError, setFormError] = useState(null);
  const createPost = useCreatePostMutation();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SubmitPostFormValues>();

  const onSubmit = async (data: SubmitPostFormValues) => {
    const formData = { ...data };

    if (kind === 'post') {
      delete formData.sharedLink;
    }

    if (kind === 'link' || !formData.text) {
      delete formData.text;
    }

    try {
      setFormError(null);

      const post = await createPost.mutateAsync(formData);
      navigate(removeOriginFromUrl(post.permalink));
    } catch (err) {
      setFormError('Something went wrong.');
    }
  };

  return (
    <>
      <Tabs
        activeTab={kind}
        selectionFollowsFocus
        onSelectTab={(tab) => setKind(tab)}
      >
        <TabList>
          <Tab
            tab={'post'}
            id="submit-post-form__post-tab"
            aria-controls="submit-post-form__post-tabpanel"
            icon={<IconFileText />}
          >
            Post
          </Tab>
          <Tab
            tab={'link'}
            id="submit-post-form__link-tab"
            aria-controls="submit-post-form__link-tabpanel"
            icon={<IconLink />}
          >
            Link
          </Tab>
        </TabList>
        <TabPanel
          tab={kind}
          id={`submit-post-form__${kind}-tabpanel`}
          aria-labelledby={`submit-post-form__${kind}-tab`}
        >
          <form
            className="submit-post-form__form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="submit-post-form__body">
              <FormInput
                label="Title"
                {...register('title', {
                  required: 'This field is required.',
                  maxLength: {
                    value: 300,
                    message: 'Max length is 300.',
                  },
                })}
                hasError={Boolean(errors.title)}
                errorMessage={errors.title?.message}
                autoComplete="off"
                autoCapitalize="off"
              />

              {kind === 'post' && (
                <FormTextArea
                  label="Text (optional)"
                  {...register('text')}
                  hasError={Boolean(errors.text)}
                  errorMessage={errors.text?.message}
                  rows={3}
                />
              )}

              {kind === 'link' && (
                <FormInput
                  label="URL"
                  type="url"
                  {...register('sharedLink', {
                    required: 'This field is required.',
                    maxLength: { value: 2048, message: 'Max length is 2048.' },
                    validate: (value) =>
                      value === '' ||
                      isURL(value, { protocols: ['http', 'https'] }) ||
                      'Please enter a valid URL.',
                  })}
                  hasError={Boolean(errors.sharedLink)}
                  errorMessage={errors.sharedLink?.message}
                  autoComplete="off"
                  autoCapitalize="off"
                />
              )}
            </div>
            <div className="submit-post-form__footer">
              <FormSubmit disabled={isSubmitting}>Submit</FormSubmit>
              {formError && <span className="form-error">{formError}</span>}
            </div>
          </form>
        </TabPanel>
      </Tabs>
    </>
  );
}
