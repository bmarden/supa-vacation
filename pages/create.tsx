import Layout from '@/components/Layout';
import ListingForm from '@/components/ListingForm';
import axios from 'axios';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(function Create() {
  const addHome = (data: any) => axios.post('/api/homes', data);

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">List your home</h1>
        <p className="text-gray-500">Fill out the form below to list a new home.</p>
        <div className="mt-8">
          <ListingForm buttonText="Add home" redirectPath="/" onSubmit={addHome} />
        </div>
      </div>
    </Layout>
  );
});
