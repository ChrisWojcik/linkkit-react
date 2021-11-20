import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Form } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import createDecorator from 'final-form-focus';
import { useRouter } from 'next/router';

import { TextField, SubmitButton } from '@/components/forms';
import Tabs from '@/components/Tabs';
import { IconLink, IconFileText } from '@/components/icons';
import { composeValidators, required, maxLength, url } from '@/lib/validation';

import styles from './SubmitPostForm.module.scss';
import formStyles from '@/components/forms/forms.module.scss';

const focusOnError = createDecorator();

function SubmitPostForm() {
  const [kind, setKind] = useState('post');
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation(createPost);

  const onSubmit = async (values) => {
    const formData = { ...values };

    if (kind === 'post') {
      delete formData.sharedLink;
    }

    if (kind === 'link') {
      delete formData.text;
    }

    formData.title = formData.title.trim();

    try {
      const post = await mutation.mutateAsync(formData);

      queryClient.invalidateQueries(['posts'], { exact: true });
      queryClient.setQueryData(['posts', post.id], { post });

      router.push(post.permalink);
    } catch (err) {
      console.error(err);
      return { [FORM_ERROR]: 'Something went wrong.' };
    }
  };

  const validateForm = (values) => {
    const errors = {};

    errors.title = composeValidators(required, maxLength(300))(values.title);

    if (kind === 'link') {
      errors.sharedLink = composeValidators(
        required,
        url,
        maxLength(2048)
      )(values.sharedLink);
    } else if (kind === 'post') {
      errors.text = composeValidators(maxLength(10000))(values.text);
    }

    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      decorators={[focusOnError]}
      validate={validateForm}
      render={({ handleSubmit, submitting, submitError }) => (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Tabs
            activeTab={kind}
            selectionFollowsFocus
            onSelect={(tab) => setKind(tab)}
          >
            <Tabs.TabList>
              <Tabs.Tab
                tab={'post'}
                id="submit-post__post-tab"
                aria-controls="submit-post__post-tabpanel"
                icon={<IconFileText />}
              >
                Post
              </Tabs.Tab>
              <Tabs.Tab
                tab={'link'}
                id="submit-post__link-tab"
                aria-controls="submit-post__link-tabpanel"
                icon={<IconLink />}
              >
                Link
              </Tabs.Tab>
            </Tabs.TabList>
            <Tabs.TabPanel
              tab={kind}
              id={`submit-post__${kind}-tabpanel`}
              aria-labelledby={`submit-post__${kind}-tab`}
            >
              <TextField
                name="title"
                id="submit-post-form__title"
                label="Title"
                autoComplete="off"
                autoCapitalize="off"
                maxLength="300"
              />
              <TextField
                name="text"
                multiline
                shouldRender={kind === 'post'}
                id="submit-post-form__tex"
                label="Text (optional)"
                rows="3"
              />
              <TextField
                name="sharedLink"
                shouldRender={kind === 'link'}
                id="submit-post-form__url"
                label="Url"
                type="url"
                autoComplete="off"
                autoCapitalize="off"
                maxLength="2048"
              />
            </Tabs.TabPanel>
          </Tabs>
          <div className={styles.footer}>
            <SubmitButton disabled={submitting}>Submit</SubmitButton>
            {submitError && (
              <span className={formStyles.formError}>{submitError}</span>
            )}
          </div>
        </form>
      )}
    />
  );
}

async function createPost(post) {
  const res = await fetch('/api/posts.create', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(post),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || 'Something went wrong.');
  }

  return json;
}

export default SubmitPostForm;
