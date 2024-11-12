import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]); // Initialize to an empty array
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    setLoading(true); // Start loading
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => {
        setVideos(data.items || []); // Ensure videos is an array
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false); // End loading even on error
      });
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff" }}>
          Copyright © 2024 JSM Media
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        {loading ? ( // Show loading state
          <Typography variant="h6" sx={{ color: "white" }}>Loading videos...</Typography>
        ) : (
          <Videos videos={videos} /> // Render videos if not loading
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
