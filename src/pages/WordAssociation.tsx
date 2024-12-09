import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Celebration from "@/components/Celebration";

const WORD_PAIRS = [
  { word: "Sheep", image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23" },
  { word: "Cat", image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901" },
  { word: "Zebra", image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d" },
  { word: "Ox", image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a" },
  { word: "Kitten", image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" },
  { word: "Whale", image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4" },
  { word: "Deer", image: "https://images.unsplash.com/photo-1439886183900-e79ec0057170" },
  { word: "Penguin", image: "https://images.unsplash.com/photo-1441057206919-63d19fac2369" },
  { word: "Monkey", image: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
  { word: "Horse", image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2" },
];

// ... keep existing code (useState declarations and other functions)

const WordAssociation = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentWord, setCurrentWord] = useState<typeof WORD_PAIRS[0] | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [celebrating, setCelebrating] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    if (!gameCompleted && !showInstructions) {
      startNewRound();
    }
  }, [gameCompleted, showInstructions]);

  const startNewRound = () => {
    const newWord = WORD_PAIRS[Math.floor(Math.random() * WORD_PAIRS.length)];
    const otherWords = WORD_PAIRS.filter(pair => pair.word !== newWord.word)
      .map(pair => pair.word);
    const shuffledOptions = [newWord.word, ...otherWords.slice(0, 2)]
      .sort(() => Math.random() - 0.5);
    
    setCurrentWord(newWord);
    setOptions(shuffledOptions);
  };

  const handleAnswer = (selectedWord: string) => {
    if (currentWord && selectedWord === currentWord.word) {
      setScore(prev => prev + 1);
      if (score + 1 >= 5) {
        setGameCompleted(true);
        setCelebrating(true);
      } else {
        setCelebrating(true);
        setTimeout(() => {
          setCelebrating(false);
          startNewRound();
        }, 2000);
      }
    }
  };

  const startGame = () => {
    setShowInstructions(false);
    startNewRound();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-purple-400 p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => navigate("/")}
        >
          ← Back to Games
        </Button>
        
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Animal Word Association
        </h1>

        {showInstructions ? (
          <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">How to Play:</h2>
            <ul className="space-y-2 mb-6">
              <li>1. Look at the picture of the animal shown</li>
              <li>2. Choose the correct word that matches the animal</li>
              <li>3. Score 5 points to win the game!</li>
              <li>4. Take your time - there's no rush!</li>
            </ul>
            <Button 
              className="w-full"
              onClick={startGame}
            >
              Start Game
            </Button>
          </div>
        ) : (
          currentWord && !gameCompleted && (
            <div className="max-w-md mx-auto">
              <img
                src={currentWord.image}
                alt="What animal is this?"
                className="w-full h-64 object-cover rounded-lg mb-8"
              />

              <div className="grid grid-cols-1 gap-4">
                {options.map((option) => (
                  <Button
                    key={option}
                    className="text-xl py-6"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              <p className="text-white text-center mt-8 text-xl">
                Score: {score}/5
              </p>
            </div>
          )
        )}

        {celebrating && (
          <Celebration 
            message={gameCompleted ? "Fantastic! You've Completed the Game! 🌟" : "Correct Answer! Keep Going! 🎉"} 
          />
        )}

        {gameCompleted && (
          <Button
            className="mx-auto block mt-4"
            onClick={() => navigate("/")}
          >
            Back to Main Menu
          </Button>
        )}
      </div>
    </div>
  );
};

export default WordAssociation;
