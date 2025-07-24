import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

const DirectorProfile = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    api.get(`/directors/${id}`).then((res) => setActor(res.data));
  }, [id]);

  if (!actor) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{actor.name}</h1>
      <p>Bio: {actor.bio || "N/A"}</p>
      <p>DOB: {actor.dob || "N/A"}</p>
    </div>
  );
};

export default DirectorProfile;
