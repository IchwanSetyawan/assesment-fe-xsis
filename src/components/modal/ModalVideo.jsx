import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import YouTube from "react-youtube";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 840,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 2,
};

const ModalVideo = ({ open, handleClose, title, description, selectMovie }) => {
  const renderTrailer = () => {
    const trailer = selectMovie?.videos?.results?.find(
      (vid) => vid.name === "Official Trailer"
    );

    return (
      <YouTube
        videoId={trailer?.key}
        opts={{
          height: "500",
          width: "100%",
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    );
  };
  return (
    <Modal open={open} onClose={handleClose} m>
      <Box sx={style}>
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        {selectMovie ? renderTrailer() : null}
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{description}</Typography>
      </Box>
    </Modal>
  );
};

export default ModalVideo;
