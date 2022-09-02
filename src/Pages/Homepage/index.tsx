import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { authorizationState } from "../../Recoil/Atom";

const HomePage = () => {
  const auth = useRecoilValue(authorizationState);

  console.log(auth);

  const { data, isLoading, isError, error, isFetching, isFetched, refetch } =
    useQuery<any, any>(["comments"], async () => {
      const data = await axios.get("http://localhost:3000/comments", {
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        },
      });
      return data;
    });

  console.log(data);

  if (isLoading) return <p>loading ...</p>;
  if (isError) return <p>{error}</p>;
  return (
    <div>
      {data.data.map((item: any) => (
        <p>{item.body}</p>
      ))}
    </div>
  );
};
export default HomePage;
