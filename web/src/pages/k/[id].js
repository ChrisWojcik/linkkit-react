import { useQuery, useQueryClient, QueryClient, dehydrate } from 'react-query';
import classNames from 'classnames';
import Head from 'next/head';
import Error from 'next/error';

import DefaultLayout from '@/components/layouts/DefaultLayout';
import Post from '@/components/Post';
import CommentForm from '@/components/CommentForm';
import CommentThread from '@/components/CommentThread';
import baseUrl from '@/lib/baseUrl';

import utilityStyles from '@/styles/utilities.module.scss';

export default function PostPage({ postId }) {
  const queryClient = useQueryClient();

  const { data, error, isFetched } = useQuery(
    ['posts', postId],
    async () => getPostById(postId, { includeComments: true }),
    {
      placeholderData: () => {
        const data = queryClient.getQueryData(['posts']);

        if (data && data.pages) {
          const posts = data.pages.flatMap((page) => page.posts);
          const post = posts.find((post) => post.id === postId);

          if (post) {
            return { post };
          }
        }
      },
    }
  );

  if (error) {
    return <Error statusCode={500} />;
  }

  if (!data) {
    return isFetched ? <Error statusCode={404} /> : null;
  }

  const { post, comments } = data;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="canonical" href={baseUrl(post.permalink)} />
      </Head>
      <div
        className={classNames(
          utilityStyles.container,
          utilityStyles['pt-xl'],
          utilityStyles['pb-xl']
        )}
      >
        <Post
          className={utilityStyles['mb-s']}
          id={`post-${post.id}`}
          post={post}
          isFocal={true}
          linkify={false}
        />
        <CommentForm
          className={utilityStyles['mb-s']}
          isFocal={true}
          postId={post.id}
        />
        {post.numComments > 0 && comments && (
          <CommentThread comments={comments} />
        )}
      </div>
    </>
  );
}

PostPage.getLayout = function getLayout(page) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

PostPage.getInitialProps = async (ctx) => {
  const postId = ctx.query.id;

  // only prefetch data during SSR
  if (!ctx.res) {
    return { postId };
  }

  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery(['posts', postId], () => {
    return getPostById(postId, { includeComments: true });
  });

  if (!data) {
    ctx.res.statusCode = 404;
  }

  return {
    postId,
    dehydratedState: dehydrate(queryClient),
  };
};

async function getPostById(id, options = {}) {
  const includeComments =
    options.includeComments === true || options.includeComments === 'true'
      ? 'true'
      : 'false';

  const res = await fetch(
    baseUrl(`/api/posts.get?id=${id}&includeComments=${includeComments}`)
  );
  const json = await res.json();

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    } else {
      throw new Error(json.message || 'Something went wrong.');
    }
  }

  return normalizePostAndComments(json);
}

function normalizePostAndComments(data) {
  const { comments, ...post } = data;

  if (!comments) {
    return {
      post,
    };
  }

  const byId = {};
  const directReplies = [];

  comments.forEach((comment) => {
    byId[comment.id] = byId[comment.id] || { replies: [] };
    byId[comment.id] = { ...comment, ...byId[comment.id] };

    if (comment.parentId) {
      byId[comment.parentId] = byId[comment.parentId] || { replies: [] };
      byId[comment.parentId].replies.push(comment.id);
    } else {
      directReplies.push(comment.id);
    }
  });

  return {
    post,
    comments: {
      byId,
      directReplies,
    },
  };
}
