import React, { useState, useEffect } from "react";
import { Button, Card, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPost,
  deletePost,
  setEdit,
  updatePost,
} from "../redux/features/postSlice";
import LoadingCard from "../UserPost/LoadingCard";

const Home = () => {
  // This set the state to undefined
  const [id, setId] = useState();
  const [bodyText, setBodyText] = useState("");
  const dispatch = useDispatch();
  const { loading, post, edit, body } = useSelector((state) => ({
    ...state.app,
  }));
  // console.log("post", post);

  useEffect(() => {
    if (body) {
      setBodyText(bodyText);
    }
  }, [bodyText]);

  const fetchUserPost = () => {
    if (!id) {
      window.alert("Please provide an ID");
    } else {
      dispatch(fetchPost({ id }));
      setId("");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Fetch Post</h1>
      <Input
        placeholder="Enter user id"
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ width: "300px" }}
      />

      <Space size="small" style={{ margin: 10 }}>
        <Button type="primary" onClick={fetchUserPost}>
          Fetch User Post
        </Button>
        <Button type="primary" onClick={() => navigate("/createPost")}>
          User Post
        </Button>
      </Space>

      <br />
      <br />

      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <div>
          {post.length > 0 && (
            <div className="site-card-border-less-wrapper">
              <Card type="image" title={post[0].title}>
                <p>User Id: {post[0].title}</p>

                {edit ? (
                  <>
                    <Input.TextArea
                      rows={4}
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                    />
                    <Space
                      size="middle"
                      style={{ marginTop: 5, marginLeft: 5 }}
                    >
                      <Button
                        type="primary"
                        onClick={() => {
                          dispatch(
                            updatePost({
                              id: post[0].id,
                              title: post[0].title,
                              body: bodyText,
                            })
                          );
                          dispatch(setEdit({ edit: false, body: "" }));
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() =>
                          dispatch(setEdit({ edit: false, body: "" }))
                        }
                      >
                        Cancel
                      </Button>
                    </Space>
                  </>
                ) : (
                  <span>{post[0].body}</span>
                )}
              </Card>

              {!edit && (
                <Space
                  size="middle"
                  style={{ marginTop: 35, marginLeft: 5, float: "right" }}
                >
                  <Button
                    style={{ cursor: "pointer" }}
                    type="primary"
                    danger
                    onClick={() => dispatch(deletePost({ id: post[0].id }))}
                  >
                    Delete
                  </Button>
                  <Button
                    style={{ cursor: "pointer" }}
                    type="primary"
                    onClick={() =>
                      dispatch(setEdit({ edit: true, body: post[0].body }))
                    }
                  >
                    Edit
                  </Button>
                </Space>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
