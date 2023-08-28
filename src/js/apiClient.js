
  const apiKey = "6fobEFX4FuOFIpuNpk5RNUBFffdoOU0BV8qozv6KxZBAfPI74GEgE1xD"; //dont touch this ever if you are not lex
  const apiUrl = 'https://api.pexels.com/v1/search?query=nature&per_page=10';
  
  async function fetchData() {
      try {
          const response = await fetch(apiUrl, {
              headers: {
                  Authorization: apiKey,
              },
          });
  
          if (!response.ok) {
              throw new Error('Request failed');
          }
  
          const data = await response.json();
  
          // Display the fetched data
          console.log(JSON.stringify(data, null, 2));
      } catch (error) {
          console.error('Error fetching data:', error);
          dataContainer.innerHTML = "<p>Error fetching data.</p>";
      }
  }
  