import MemeTable from "@/components/MemeTable";

export default function Home() {
  return (
    <>
    <div className="mb-2">
      <h2 className="text-xl font-bold">Meme Collection</h2>
    </div>
    <p className="pb-6">
      So, here's a table from the assignment requirements! Here you can browse the meme collection and edit them with a single click. You can change names, update links to images (only JPG) and set the number of likes (up to 99) - with built-in data validation.
      This is part of our React meme catalog app using HeroUI components.
    </p>
   <MemeTable></MemeTable>
    </>
  );
}
