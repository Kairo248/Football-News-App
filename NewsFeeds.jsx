import React, { useState, useEffect } from "react"
import "./NewsFeeds.css"

// State hooks for storing news articles, loading status, and error messages
const NewsFeeds = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect hook to fetch news when the component mounts
useEffect(() => {
    // Async function to fetch news data
    const fetchNews = async () => {
        try {
            // Fetching news data from the Guardian API
            const response = await fetch("https://content.guardianapis.com/search?api-key=e6064791-2a3a-4361-9a71-ada58e6fdbb4&q=football&section=football&show-fields=trailText&order-by=newest");
            // Checking if the response is successfull
            if (!response.ok) {
                throw new Error("Failed to fetch news");
            }
            //Parsing the JSON response and setting the news state
            const data = await response.json();
            setNews(data.response.results);
        } catch (error) {
            //Setting an error message if something goes wrong
            setError(error.message);
        } finally {
            // Updating the loading state to false after the fetch comples
            setLoading(false);
        }
    };

    // Calling the fetchNews function when the component mounts
    fetchNews();
}, []); // Empty dependency array to run the effect only once when the component mounts

// If loading, display a loading message
if(loading) return <p className="loading">Loading fooball news</p>

// If there is an error, display the error message
if(error) return <p>Error: {error}</p>

// Display the list of news articles when the data is fetched
return(
    <div className="news">
        <div className="news-container">
        <ul>
            {news.map((article) => (
                <li key={article.id} className="news-card">
                    <div className="news-content">
                  <h2>{article.webTitle}</h2>
                  <p>{article.fields.trailText}</p>
                  <h4 className="news-date">{new Date(article.webPublicationDate).toDateString()}</h4>
                  <button><a href={article.webUrl} target="blank" rel="/" className="read-more">Read Full Story →</a></button>
                    </div> 
                </li>
            ))}
        </ul>
       </div>
    </div>
);
} 


  

export default NewsFeeds