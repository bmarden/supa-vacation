import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';
import { InferGetServerSidePropsType } from 'next';

export async function getServerSideProps() {
  const homes = await prisma.home.findMany();
  return {
    props: {
      homes
    }
  };
}

export default function Home({ homes = [] }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">Top-rated places to stay</h1>
      <p className="text-gray-500">Explore some of the best places in the world</p>
      <div className="mt-8">
        <Grid homes={homes} />
      </div>
    </Layout>
  );
}
