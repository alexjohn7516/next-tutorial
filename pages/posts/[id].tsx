import Layout from "../../components/layout";
import Date from "../../components/date";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticPaths, GetStaticProps } from "next";

//* [1 of 3]
//* Destructure params value postData from getStaticProps
export default function Post({ postData }: {postData: {title: string, date: string, contentHtml: string}}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        {/* {postData.id} */}
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* ? a div with a closing tage? */}
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

//* [2 of 3]
//* Create the ids array for the dynamic paths on this route
export const getStaticPaths : GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

//* [3 of 3]
//* Make a server side render to get props from specific ID that was entered into the URL. This render is done statically with the page load.
export const getStaticProps: GetStaticProps = async ({ params }: {params: {id: string}}) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}