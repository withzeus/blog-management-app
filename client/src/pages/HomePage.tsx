import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/form/Form";
import usePosts, { Post } from "../hooks/usePosts";
import { useAuth } from "../hooks/useAuth";
import { Table, Td, Th } from "../components/table/Table";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const { user: userContext, logout } = useAuth();
  const { getPosts } = usePosts();

  useEffect(() => {
    if (userContext) {
      (async function () {
        const data = (await getPosts()) || [];
        setPosts(data);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext]);

  return (
    <div>
      <h1>Posts</h1>
      <Table>
        <thead>
          <tr>
            <Th>Title</Th>
            <Th>Content</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <Td>{post.title}</Td>
              <Td>{post.content}</Td>
              <Td>
                <Link to={`/post/${post.id}`}>View</Link>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => navigate("/create-post")}>Create Post</Button>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default HomePage;
