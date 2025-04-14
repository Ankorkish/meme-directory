"use client"

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Heart } from "lucide-react";
import { useMemes } from "./../hooks/useMemes";

export default function MemeCardList() {
  const { memes, isLoaded } = useMemes();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center text-lg font-medium">Loading meme collection...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {memes.map((meme) => (
        <Card
          key={meme.id}
          className="shadow-md hover:shadow-lg transition-shadow"
        >
          <CardHeader className="pb-0 pt-3 px-4">
            <h3 className="font-bold text-xl truncate">{meme.name}</h3>
          </CardHeader>
          <CardBody className="p-3">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                alt={meme.name}
                className="object-cover w-full h-60 rounded-lg"
                src={meme.imgLink}
              />
            </div>
          </CardBody>
          <CardFooter className="flex justify-between items-center px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Heart size={18} className="fill-red-500 text-red-500" />
              <span className="font-medium">{meme.likes}</span>
            </div>
            <Button
              as="a"
              href={meme.imgLink}
              target="_blank"
              rel="noopener noreferrer"
              variant="flat"
              color="primary"
              className="font-medium text-sm"
              size="sm"
            >
              View Original
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}