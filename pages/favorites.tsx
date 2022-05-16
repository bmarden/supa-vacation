import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';
import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { UsersIcon } from '@heroicons/react/outline';

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

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.sub
      },
      include: {
        favoriteHomes: true
      }
    });

    return {
      props: {
        homes: user?.favoriteHomes 
      }
    };
  }
});

const Favorites = ({ homes = [] }) => {
  return (
    <Layout>
      <h1 className="text-xl font-medium text-gray-800">Your listings</h1>
      <p className="text-gray-500">
        Manage your homes and update your listings
      </p>
      <div className="mt-8">
        <Grid homes={homes} />
      </div>
    </Layout>
  );
};

export default Favorites;