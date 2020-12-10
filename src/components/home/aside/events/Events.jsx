import React, { useEffect, useState } from "react";
import config from "../../../../config";

function Events() {
  
  const [posts, setPosts] = useState([]);
  const page = 0;

  useEffect(() => {
    fetch(`${config.baseUrl}/posts?page=${page}&byPage=${3}`)
      .then((response) => response.json())
      .then((postsPage) => {
        setPosts(postsPage.content);
      });
  }, [setPosts, page]);

  return (
    <div className="asideContent row">
      <div className="asideContent col-md-12">
        <div className="asideTitle">
          <h5 className="asideTitle">PRÓXIMOS EVENTOS</h5>
        </div>
        <div className="eventsContent">
          {posts.length > 0 ? (
            posts.map((post, i) => (
              <ul className="eventsList" key={`post_${i}`}>
                <li>
                  {post.eventName} ({post.eventDate})
                </li>
              </ul>
            ))
          ) : (
            <div>
              <p>No hay eventos próximos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
