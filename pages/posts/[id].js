import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

//* [1 of 3]
//* Destructure params value postData from getStaticProps
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}

//* [2 of 3]
//* Create the ids array for the dynamic paths on this route
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

//* [3 of 3]
//* Make a server side render to get props from specific ID that was entered into the URL. This render is done statically with the page load.
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}