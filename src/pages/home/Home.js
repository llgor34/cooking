import './Home.css';
import RecipeList from '../../components/recipeList/RecipeList';
import { projectFirestore } from '../../firebase/config';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection('recipes').onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError('No recipes to load');
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
        }
        setIsPending(false);
      },
      (error) => {
        setError(error.message);
        setIsPending(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
