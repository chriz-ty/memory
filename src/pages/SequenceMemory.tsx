import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Celebration from "@/components/Celebration";

interface NumberTile {
  number: number;
  isClicked: boolean;
}

const SequenceMemory = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(true);
  const [level, setLevel] = useState(1);
  const [numbers, setNumbers] = useState<NumberTile[]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [celebrating, setCelebrating] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const generateNumbers = (level: number) => {
    const count = level * 2; // 2 numbers for level 1, 4 for level 2, etc.
    const newNumbers: NumberTile[] = Array.from({ length: count }, (_, index) => ({
      number: index + 1,
      isClicked: false
    })).sort(() => Math.random() - 0.5);
    
    setNumbers(newNumbers);
    setNextNumber(1);
    console.log("Generated numbers for level", level, newNumbers);
  };

  const startGame = () => {
    setShowInstructions(false);
    generateNumbers(level);
  };

  const handleNumberClick = (clickedNumber: number, index: number) => {
    if (clickedNumber === nextNumber) {
      console.log("Correct number clicked:", clickedNumber);
      const updatedNumbers = [...numbers];
      updatedNumbers[index].isClicked = true;
      setNumbers(updatedNumbers);
      
      if (nextNumber === numbers.length) {
        // Level completed
        if (level === 5) {
          setGameCompleted(true);
          setCelebrating(true);
        } else {
          setCelebrating(true);
          setTimeout(() => {
            setCelebrating(false);
            setLevel(prev => prev + 1);
            generateNumbers(level + 1);
          }, 2000);
        }
      } else {
        setNextNumber(prev => prev + 1);
      }
    } else {
      console.log("Wrong number clicked. Expected:", nextNumber, "Got:", clickedNumber);
    }
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
          Number Sequence Game
        </h1>

        {showInstructions ? (
          <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">How to Play:</h2>
            <ul className="space-y-2 mb-6">
              <li>1. Click on numbers in order from 1 to the highest number</li>
              <li>2. Each level adds more numbers to sequence</li>
              <li>3. Complete all 5 levels to win!</li>
              <li>4. Take your time - accuracy is more important than speed</li>
            </ul>
            <Button 
              className="w-full"
              onClick={startGame}
            >
              Start Game
            </Button>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-white/90 rounded-lg p-4 mb-8 text-center">
              <p className="text-xl">Level {level}</p>
              <p className="text-lg">Find number: {nextNumber}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {numbers.map((item, index) => (
                <Button
                  key={index}
                  className={`h-20 text-2xl font-bold ${
                    item.isClicked 
                      ? "bg-green-500 hover:bg-green-500 cursor-default"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                  onClick={() => handleNumberClick(item.number, index)}
                  disabled={item.isClicked}
                >
                  {item.number}
                </Button>
              ))}
            </div>
          </div>
        )}

        {celebrating && (
          <Celebration 
            message={gameCompleted ? "Amazing! You've Completed All Levels! 🌟" : `Great Job! Level ${level} Complete! 🎉`} 
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

export default SequenceMemory;