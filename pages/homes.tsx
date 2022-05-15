import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { prisma } from '@/lib/prisma';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    const session = getSession(ctx.req, ctx.res);

    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }

    const homes = await prisma.home.findMany({
      where: { owner: { id: session.user.sub } },
      orderBy: { createdAt: 'desc' }
    });

    return {
      props: {
        homes
      }
    };
  }
});

const Homes = ({ homes }: InferGetServerSidePropsType<typeof getServerSideProps>)  => (
  <Layout>
    <h1 className="text-xl font-medium text-gray-800">
      <p className="text-gray-500">Manage your homes and update your listings</p>
      <div className="mt-8">
        <Grid homes={homes}></Grid>
      </div>
    </h1>
  </Layout>
);

export default Homes;
