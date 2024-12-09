import confetti from "canvas-confetti";
import { useEffect } from "react";

interface CelebrationProps {
  message: string;
}

const Celebration = ({ message }: CelebrationProps) => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-celebrate">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          {message}
        </h2>
        <p className="text-gray-600 text-xl">Keep up the great work! 🌟</p>
      </div>
    </div>
  );
};

export default Celebration;