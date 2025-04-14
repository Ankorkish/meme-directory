"use client"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState } from "react";
import { useMemes } from "./../hooks/useMemes"

export default function MemeTable() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { memes, isLoaded, validateUrl, validateLikes, updateMeme } = useMemes();

  const [editMeme, setEditMeme] = useState(null);
  const [nameError, setNameError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [likesError, setLikesError] = useState("");

  const validateName = (name) => {
    if (!name || name.length < 3) {
      return "Name must be at least 3 characters";
    }
    if (name.length > 100) {
      return "Name cannot exceed 100 characters";
    }
    return "";
  };

  const handleEdit = (meme) => {
    setEditMeme({ ...meme });
    setNameError("");
    setUrlError("");
    setLikesError("");
    onOpen();
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setEditMeme({ ...editMeme, name: newName });
    setNameError(validateName(newName));
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setEditMeme({ ...editMeme, imgLink: newUrl });
    setUrlError(validateUrl(newUrl));
  };

  const handleLikesChange = (e) => {
    const likesValue = parseInt(e.target.value, 10) || 0;
    setEditMeme({ ...editMeme, likes: likesValue });
    setLikesError(validateLikes(likesValue));
  };

  const handleSave = (onClose) => {
    const nameValidationError = validateName(editMeme.name);
    const urlValidationError = validateUrl(editMeme.imgLink);
    const likesValidationError = validateLikes(editMeme.likes);

    if (nameValidationError) {
      setNameError(nameValidationError);
      return;
    }

    if (urlValidationError) {
      setUrlError(urlValidationError);
      return;
    }

    if (likesValidationError) {
      setLikesError(likesValidationError);
      return;
    }

    const result = updateMeme(editMeme);
    if (result.success) {
      onClose();
    } else {
      setNameError(result.nameError || "");
      setUrlError(result.urlError || "");
      setLikesError(result.likesError || "");
    }
  };

  if (!isLoaded) {
    return <div>Loading meme collection...</div>;
  }

  return (
    <>
      <Table aria-label="Meme Table">
        <TableHeader>
          <TableColumn>Id</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>ImgLink</TableColumn>
          <TableColumn>Likes</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {memes.map((meme) => (
            <TableRow key={meme.id}>
              <TableCell>{meme.id}</TableCell>
              <TableCell>{meme.name}</TableCell>
              <TableCell>{meme.imgLink}</TableCell>
              <TableCell>{meme.likes}</TableCell>
              <TableCell>
                <Button color="primary" size="sm" onClick={() => handleEdit(meme)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Edit Meme</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="id">ID</label>
                    <Input
                      value={editMeme?.id || ""}
                      readOnly={true}
                      name={"id"}
                      isDisabled={true}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1"  htmlFor="name">Name (3-100 characters)</label>
                    <Input
                      value={editMeme?.name || ""}
                      onChange={handleNameChange}
                      placeholder="Meme name"
                      name={"name"}
                      isInvalid={!!nameError}
                    />
                    {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1"  htmlFor="url">Image URL (JPG only)</label>
                    <Input
                      value={editMeme?.imgLink || ""}
                      onChange={handleUrlChange}
                      name={"url"}
                      placeholder="https://example.com/image.jpg"
                      isInvalid={!!urlError}
                    />
                    {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1"  htmlFor="likes">Likes (max 99)</label>
                    <Input
                      type="number"
                      value={editMeme?.likes || 0}
                      onChange={handleLikesChange}
                      name={"likes"}
                      max={99}
                      min={0}
                      isInvalid={!!likesError}
                    />
                    {likesError && <p className="text-red-500 text-sm mt-1">{likesError}</p>}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Discard Changes
                </Button>
                <Button color="primary" onClick={() => handleSave(onClose)}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}