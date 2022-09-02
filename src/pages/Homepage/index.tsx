import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";

import { authorizationState } from "@recoil/Atom";
import { ReactNode } from "react";

const HomePage = () => {
  const auth = useRecoilValue(authorizationState);

  const { data, isLoading, isError, error } = useQuery(["comments"], async () => {
    const { data } = await axios.get("http://localhost:3000/comments", {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    });

    return data;
  });

  if (isLoading) return <p>loading ...</p>;
  if (isError) return <p>{error as ReactNode}</p>;

  return (
    <div>
      {data.map((item: any) => (
        <p>{item.body}</p>
      ))}
    </div>
  );
};

export default HomePage;
