import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const CardComponent = ({ data, handleCard }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  return (
    <Card
      onClick={() => handleCard(data?.id)}
      sx={{
        minWidth: 330,
        margin: 1,
        borderRadius: 2,
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 0 10px #ccc",
        },
      }}
    >
      <CardMedia
        component="img"
        alt={data?.title || "Movie Image"}
        height="380"
        image={data?.poster_path ? IMAGE_PATH + data?.poster_path : null}
        sx={{
          objectFit: "fill",
        }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {data?.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
