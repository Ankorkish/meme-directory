import { title } from "@/components/primitives";
import MemeCardList from "@/components/MemeList";

export default function PricingPage() {
  return (<>
      <div className="mb-2 w-full text-left">
        <h2 className="text-xl font-bold">Memes in cards</h2>
      </div>
      <p className="mb-6">
        So, here's a list of cards from the assignment requirements! Browse our meme collection in the form of attractive cards with images. For each meme, you see its name, picture, number of likes, and a button to view the original. This is the second part of our React meme catalog app using HeroUI Card and Image components.
      </p>
    <MemeCardList />
  </>
  );
}
