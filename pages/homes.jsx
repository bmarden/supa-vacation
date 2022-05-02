import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    const { user } = getSession(ctx.req, ctx.res);

    const homes = await prisma.home.findMany({
      where: { owner: { id: user.sub } },
      orderBy: { createdAt: 'desc' }
    });

    return {
      props: {
        homes: JSON.parse(JSON.stringify(homes))
      }
    };
  }
});

const Homes = (props) => (
  <Layout>
    <h1 className="text-xl font-medium text-gray-800">
      <p className="text-gray-500">Manage your homes and update your listings</p>
      <div className="mt-8">
        <Grid homes={props.homes}></Grid>
      </div>
    </h1>
  </Layout>
);

export default Homes;
// export default withPageAuthRequired(Homes);
