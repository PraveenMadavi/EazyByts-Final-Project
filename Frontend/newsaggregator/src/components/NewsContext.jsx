// NewsContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [testArticle, setTestArticle] = useState('');
  const [userEmail, setUserEmail]=useState('');
  const [user_name, setUser_Name] = useState('');

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  return (
    <NewsContext.Provider value={{
      articles,
      setArticles,
      searchQuery,
      setSearchQuery,
      page,
      setPage,
      testArticle,
      userEmail,
      setUserEmail,
      user_name,
      setUser_Name
    }}>
      {children}
    </NewsContext.Provider>
  );


};