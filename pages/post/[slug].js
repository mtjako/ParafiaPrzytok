import Head from "next/head";
import { Content } from "../../components/Content";
import { Footer } from "../../components/Footer";
import { Navigation } from "../../components/Navigation";
import { getPost,getMenu,getAllPosts } from "../../graphql/client";

export async function getStaticPaths() {
  const DATA_POSTS = await getAllPosts("");
  const posts = DATA_POSTS == null ? null : DATA_POSTS.posts.nodes;
  return {
    paths: posts.map(post=>`/post/${post.slug}`),
    fallback: 'blocking'  
  };
}

export async function getStaticProps(context) {
  const DATA_POST = await getPost(context.params.slug);
  const DATA_MENU = await getMenu('mainmenu');
  const DATA_FOOTER = await getMenu('footer');
  const post = DATA_POST.post;
  const menu = DATA_MENU.menu.menuItems.nodes;
  const footer = DATA_FOOTER.menu.menuItems.nodes;
  return {
    props: {
      post,
      menu,
      footer,
    },
    revalidate: 1,
  };
}


export default function Post({post,menu,footer}) {
  return (
    <>
      <Head>
        <title>Parafia Przytok</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation menu={menu}/>
      <Content post={post}/>
      <Footer footer={footer}/>
    </>
  );
}
