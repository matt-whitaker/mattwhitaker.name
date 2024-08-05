import React from "react";

const ScrollContainer = ({ children }) => <div className="w-[100vw] h-[100vh] flex items-center">{children}</div>;

const images = [
  "http://localhost:8081/1_EBOL4lka5QjcYoxj6AHp-g.png",
  "http://localhost:8081/8-Tyler-the-Creator.webp",
  "http://localhost:8081/16-Tame-Impala.webp",
  "http://localhost:8081/35.-Metallica-‘Master-of-Puppets-1986-album-art-billboard-1240.webp",
  "http://localhost:8081/1682339833-best-album-covers-time-04.jpg",
  "http://localhost:8081/ab67616d0000b273006d456ac41a8dc73a0b67cc-1.jpeg",
  "http://localhost:8081/best-hip-hop-album-covers-9-1386002950-view-0.jpg",
  "http://localhost:8081/collection.webp",
  "http://localhost:8081/download.jpeg",
  "http://localhost:8081/indieblog-best-album-covers-2010s-07.jpg",
  "http://localhost:8081/nirvana.webp",
  "http://localhost:8081/tlp_hero_album-cover-art-73ab5b3d9b81f442cb2288630ab63acf.jpg",
  "http://localhost:8081/tlp_hero_album-covers-d12ef0296af80b58363dc0deef077ecc.jpg",
  "http://localhost:8081/virgil-abloh-album-covers-asap-rocky-long-live-asap.jpeg.webp"
]

export const ImageScroller = ({ test }) => {
  return (
    <ScrollContainer>
      {images.map((image, i) => <img src={image} key={i} alt={i} />)}
    </ScrollContainer>
  );
};