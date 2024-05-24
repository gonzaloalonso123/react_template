import React from "react";
import { useData } from "../context/data/DataProvider";
import Button from "../components/generic/Button";
import { useLoad } from "../context/data/methods";

export const Home = () => {
  const { get, post, patch, del } = useData();
  const { loading, spaceships } = useLoad("spaceships");
  return (
    <div className="flex items-center justify-center flex-col gap-3 p-8 h-screen w-screen bg-pink-200">
      <Button onClick={() => get.spaceships()}>get</Button>
      <Button onClick={() => post.spaceships({ name: "Test", model: "Test" })}>
        Post
      </Button>
      <Button
        onClick={() =>
          patch.spaceships("c3369bf7-ea9e-499f-96dd-0e1849bd1c88", {
            model: "better model",
          })
        }
      >
        patch
      </Button>
      <Button
        onClick={() => del.spaceships("c3369bf7-ea9e-499f-96dd-0e1849bd1c88")}
      >
        Delete
      </Button>

      <div>
        {/* {posts?.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))} */}
        {loading ? <div>loading</div> : JSON.stringify(spaceships)}
      </div>
    </div>
  );
};
