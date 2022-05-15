// pages/homes/[id]/edit.js
import Layout from '@/components/Layout';
import ListingForm, { FormValues } from '@/components/ListingForm';
import { PrismaClient } from '@prisma/client';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { InferGetServerSidePropsType } from 'next'
import axios from 'axios';

const prisma = new PrismaClient();

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    const session = getSession(ctx.req, ctx.res);

    const redirect = {
      redirect: {
        destination: '/',
        permanent: false
      }
    };

    if (!session) {
      return redirect;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.sub },
      select: { listedHomes: true }
    });

    const id = ctx?.params?.id;
    const home = user?.listedHomes?.find((home) => home.id === id);
    if (!home) {
      return redirect;
    }

    return {
      props: {
        home
      }
    };
  }
});

interface EditProps {
  home: object; 
  user: object;
}

const Edit = ({ home, user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const handleOnSubmit = (data: FormValues) => {
    axios.patch(`/api/homes/${home.id}`, data);
  };
  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">Edit your home</h1>
        <p className="text-gray-500">Fill out the form below to update your home.</p>
        <div className="mt-8">
          {home && (
            <ListingForm
              buttonText="Update home"
              initialValues={home}
              redirectPath={`/homes/${home.id}`}
              onSubmit={handleOnSubmit}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
