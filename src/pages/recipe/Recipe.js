import './Recipe.css';
import { useParams } from 'react-router';
import { useTheme } from '../../hooks/useTheme';
import { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';

const Recipe = () => {
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const { mode } = useTheme();

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection('recipes')
      .doc(id)
      .onSnapshot(
        (doc) => {
          if (!doc.exists) {
            setError("That recipe doesn't exist!");
          } else {
            setRecipe(doc.data());
          }
          setIsPending(false);
        },
        (error) => {
          setError(error.message);
        }
      );

    return () => unsub();
  }, [id]);

  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      title: 'Something completely different',
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </>
      )}
    </div>
  );
};

export default Recipe;
