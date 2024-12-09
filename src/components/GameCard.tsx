import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface GameCardProps {
  title: string;
  description: string;
  onClick: () => void;
  imageSrc: string;
}

const GameCard = ({ title, description, onClick, imageSrc }: GameCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full"
    >
      <Card
        className="p-6 cursor-pointer bg-primary hover:bg-primary/90 transition-colors"
        onClick={onClick}
      >
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-2xl font-bold mb-2 text-primary-foreground">{title}</h3>
        <p className="text-primary-foreground/80">{description}</p>
      </Card>
    </motion.div>
  );
};

export default GameCard;