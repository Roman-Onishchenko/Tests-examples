import React, { useState } from "react";

const Author = ({ author, activeAuthor, onSelect }) => {
  const isActive = activeAuthor && author.id === activeAuthor.id;
  return (
    <div className={isActive ? "author author--active" : "author"}>
      <button onClick={() => onSelect(author)}>{author.name}</button>
    </div>
  );
};

const Post = ({ post }) => {
  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.body}</p>
    </div>
  );
};

export default function Authors({ fetchAuthors, fetchPosts }) {
  const [authors, setAuthors] = useState([]);
  const [activeAuthor, setActiveAuthor] = useState(null);
  const [posts, setPosts] = useState([]);

  // Load authors on start
  React.useEffect(() => {
    fetchAuthors().then(setAuthors);
  }, []);

  // Load Posts when author changes
  React.useEffect(() => {
    setPosts([]);

    if (activeAuthor) {
      fetchPosts(activeAuthor.id).then(setPosts);
    }
  }, [activeAuthor]);

  return (
    <div className="authors">
      <div className="author-options">
        <h3>Select an Author:</h3>
        {authors.map((author) => (
          <Author
            key={author.id}
            author={author}
            activeAuthor={activeAuthor}
            onSelect={setActiveAuthor}
          />
        ))}
      </div>
      {activeAuthor && (
        <div className="posts">
          <h3>Posts by {activeAuthor.name}</h3>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
