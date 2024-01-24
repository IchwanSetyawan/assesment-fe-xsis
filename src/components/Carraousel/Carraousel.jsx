import { Box } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carraousel = ({ datas }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  return (
    <Carousel>
      {datas.map((item, idx) => (
        <Box key={idx}>
          <img
            src={item?.backdrop_path ? IMAGE_PATH + item?.backdrop_path : null}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default Carraousel;
