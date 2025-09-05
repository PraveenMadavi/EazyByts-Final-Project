import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import NewsCards from './NewsCards';
import NewsNav from './NewsNav';
import axios from 'axios';
import { useNews } from './NewsContext';





function NewsBody() {
    const [articles, setArticles] = useState([]);
    const { searchQuery, page, testArticle } = useNews();

    const BaseURL = import.meta.env.VITE_API_BASE_URL;

    const reqData = {
        q: searchQuery || "Indian everything",
        pageSize: 24,
        page
    }

    const newsArticles = async () => {
        try {
            // console.log("Base URL >> ", BaseURL)
            const res = await axios.post(`${BaseURL}/news/get-news`, reqData, {
                withCredentials: true,
            });
            console.log("downloaded result >> ", res.data);
            setArticles(res.data);

        } catch (error) {
            console.error("error occured during fetch news data.",error)

            // setArticles(testArticle)
            // console.log("Test articles >>",articles);
        }
    }

    useEffect(() => {
        newsArticles();//..........................................................for showing results
        console.log("From NewsBody with the help of context : ", searchQuery);
    }, [searchQuery, page]);

    return (
        <>
            <NewsNav />
            <NewsCards news={articles} />
        </>
    );
}

export default NewsBody;