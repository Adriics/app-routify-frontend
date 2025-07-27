"use client";

import { useEffect, useState } from "react";
import { useBikeRoute } from "../contexts/BikeRouteContext";
import { useRouter } from "next/router";
import { User } from "@/context/user/domain/User";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/user/contexts/UserContext";
import { Button } from "@/components/ui/button";

export default function CreateBikeRouteForm() {
  const [name, setName] = useState("");
  const [distance, setDistance] = useState<number>(0);
  const [creator, setCreator] = useState<User>();
  const [image, setImage] = useState<File | undefined>();

  const { create, isLoading, error } = useBikeRoute();

  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!creator) {
      console.error("Creator no definido");
      return;
    }

    try {
      await create(name, distance, creator, image);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) setCreator(user);
  }, [user]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Ruta por la playa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>

        <Input
          type="number"
          placeholder="Distancia de la ruta"
          value={distance}
          onChange={(e) =>
            setDistance(e.target.value === "" ? 0 : Number(e.target.value))
          }
        ></Input>

        <Input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImage(e.target.files[0]);
            }
          }}
        ></Input>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating route" : "Create route"}
        </Button>
      </form>
    </div>
  );
}
