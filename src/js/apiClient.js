import { createClient } from "./pexels";

const client = createClient(
  "6fobEFX4FuOFIpuNpk5RNUBFffdoOU0BV8qozv6KxZBAfPI74GEgE1xD"
); //dont touch this ever

const query = "Nature";
const apiUrl = "https://api.pexels.com/v1/search";
const orientation = "landscape";
const perPage = 10;

client.videos
  .search({ query, orientation, per_page: perPage })
  .then((response) => {
    console.log(JSON.stringify(response));
    console.log(response.videos);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
