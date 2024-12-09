import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Celebration from "@/components/Celebration";

const CARDS = [
  "🐶", "🐱", "🐰", "🐼", "🦊", "🐯",
  "🐶", "🐱", "🐰", "🐼", "🦊", "🐯"
];

const PictureMatching = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(true);
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [celebrating, setCelebrating] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    setCards(CARDS.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        const newMatched = [...matched, ...newFlipped];
        setMatched(newMatched);
        setFlipped([]);
        
        if (newMatched.length === cards.length) {
          setGameCompleted(true);
          setCelebrating(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const startGame = () => {
    setShowInstructions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-primary p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => navigate("/")}
        >
          ← Back to Games
        </Button>
        
        <h1 className="text-4xl font-bold text-center mb-8 text-primary-foreground">
          Picture Matching Game
        </h1>

        {showInstructions ? (
          <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">How to Play:</h2>
            <ul className="space-y-2 mb-6">
              <li>1. Click on any card to reveal the picture</li>
              <li>2. Try to find the matching pair</li>
              <li>3. Match all pairs to win!</li>
              <li>4. Take your time and have fun!</li>
            </ul>
            <Button 
              className="w-full"
              onClick={startGame}
            >
              Start Game
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`aspect-square cursor-pointer transition-all duration-300 transform ${
                  flipped.includes(index) || matched.includes(index)
                    ? "rotate-y-180"
                    : ""
                }`}
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={`w-full h-full bg-white rounded-xl flex items-center justify-center text-4xl shadow-lg
                    ${flipped.includes(index) || matched.includes(index)
                      ? "bg-secondary"
                      : "bg-primary"}`}
                >
                  {flipped.includes(index) || matched.includes(index) ? card : "?"}
                </div>
              </div>
            ))}
          </div>
        )}

        {celebrating && (
          <Celebration message="Amazing Job! You matched all the pictures! 🎉" />
        )}

        {gameCompleted && (
          <Button
            className="mx-auto block mt-8"
            onClick={() => navigate("/")}
          >
            Back to Main Menu
          </Button>
        )}
      </div>
    </div>
  );
};

export default PictureMatching;