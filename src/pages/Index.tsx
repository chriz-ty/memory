import { useNavigate } from "react-router-dom";
import GameCard from "@/components/GameCard";

const Index = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: "Picture Matching",
      description: "Match pairs of cards with fun pictures!",
      path: "/picture-matching",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    },
    {
      title: "Sequence Memory",
      description: "Remember and repeat patterns of colors and sounds!",
      path: "/sequence-memory",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    },
    {
      title: "Word Association",
      description: "Match words with their pictures!",
      path: "/word-association",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-primary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-primary-foreground">
          Welcome to Fun Learning! 🌟
        </h1>
        <p className="text-xl text-center mb-12 text-primary-foreground/80">
          Choose a game to start your adventure!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard
              key={game.title}
              title={game.title}
              description={game.description}
              onClick={() => navigate(game.path)}
              imageSrc={game.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;