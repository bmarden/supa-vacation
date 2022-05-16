import Card from '@/components/Card';
import { useUser } from '@auth0/nextjs-auth0';
import { ExclamationIcon } from '@heroicons/react/outline';
import { Home } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface GridProps {
  homes: Home[];
}
const Grid = ({ homes = [] }: GridProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user, error } = useUser();

  const isEmpty = homes.length === 0;

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchFavorites = async () => {
      const resp = await axios.get<{ favorites: string[] }>('/api/user/favorites');
      setFavorites(resp.data.favorites);
    };

    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (id: string) => {
    const resp = await axios.put(`/api/homes/${id}/favorite`);
    if (resp.status === 200) {
      setFavorites((favorites) => [...favorites, id]);
    }
  };

  return isEmpty ? (
    <p className="text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1">
      <ExclamationIcon className="shrink-0 w-5 h-5 mt-px" />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {homes.map((home) => (
        <Card
          key={home.id}
          {...home}
          onClickFavorite={toggleFavorite}
          favorite={favorites.includes(home.id)}
        />
      ))}
    </div>
  );
};

export default Grid;
