import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Box, Typography } from "@mui/material";
import CardComponent from "../components/card/CardComponent";
import axios from "axios";
import ModalVideo from "../components/modal/ModalVideo";
import { useSearch } from "../context/SearchContext";

const Home = () => {
  const url = "https://api.themoviedb.org/3";
  const [datas, setDatas] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const { searchTerm } = useSearch();

  const [selectMovie, setSelectMovie] = useState(null);

  const getDatas = async () => {
    await axios
      .get(`${url}/discover/movie`, {
        params: {
          api_key: import.meta.env.VITE_API_MOVIE_API_KEY,
        },
      })
      .then((response) => {
        setDatas(response.data?.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchVideo = async (id) => {
    const { data } = await axios.get(`${url}/movie/${id}`, {
      params: {
        api_key: import.meta.env.VITE_API_MOVIE_API_KEY,
        append_to_response: "videos",
      },
    });

    return data;
  };

  const handleOpen = async (id) => {
    const data = await fetchVideo(id);
    setSelectMovie(data);

    const selectedMovie = datas.find((movie) => movie.id === id);

    if (selectedMovie) {
      setActiveVideo(selectedMovie);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filteredData = datas.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDatas(filteredData);
      setIsSearching(true);
    } else {
      getDatas();
      setIsSearching(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Typography variant="h4" component="div">
          {isSearching ? "Search" : "Movie List"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            justifyContent: "center",
          }}
        >
          {datas.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {datas.map((item, idx) => (
                <CardComponent key={idx} data={item} handleCard={handleOpen} />
              ))}
            </Box>
          ) : (
            <Box>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#ccc",
                  marginTop: 10,
                }}
              >
                No movies found!
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {activeVideo && (
        <ModalVideo
          open={open}
          handleClose={() => setOpen(false)}
          title={activeVideo?.title}
          description={activeVideo?.overview}
          selectMovie={selectMovie}
        />
      )}
    </Layout>
  );
};

export default Home;
