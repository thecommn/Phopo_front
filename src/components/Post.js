import React from "react";
import axios from "axios";
// import profile from "../image/like.png";
import Content from "./Content";
import { useEffect, useState, useRef } from "react";
// import { useInView } from "react-intersection-observer";

const Post = () => {
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(true);
  const preventRef = useRef(true);
  const obsRef = useRef(null);
  const email = "wnsdud2021@naver.com";
  useEffect(() => {
    getPost();
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    getPost();
  }, [page]);

  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  };

  const getPost = async () => {
    setLoad(true);
    const res = await axios.get(
      `http://192.168.0.209:8090/post/email/${email}`
    );
    // console.log(res.data);
    if (res.data) {
      setPostData(res.data); //리스트 추가
      // console.log(res.data);
    } else {
      console.log(res); //에러
    }
    setLoad(false);
  };

  return (
    <>
      <div className="wrap min-h-[100vh]">
        {postData && (
          <>
            {postData.map((el, index) => {
              return (
                <div key={index}>
                  <Content email={email} post={el} posts={postData} />
                </div>
              );
            })}
          </>
        )}
        {load && <div className="py-3 bg-blue-500 text-center">로딩 중</div>}
        <div ref={obsRef} className="py-3 bg-red-500 text-white text-center">
          옵저버 Element
        </div>
      </div>
    </>
  );
};

export default Post;
