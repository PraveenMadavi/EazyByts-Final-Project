import React from 'react'
import { FaShareAlt, FaThumbsUp, FaComment } from "react-icons/fa";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, CardImg, CardFooter } from 'reactstrap';
import '../styles/NewsCard.css'; // Import the CSS file

function NewsCard({ article }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleShare = (platform) => {
        const url = encodeURIComponent(article.url);
        const text = encodeURIComponent(article.title);
        const img = encodeURIComponent(article.urlToImage);

        let shareUrl = "";

        switch (platform) {
            case "whatsapp":
                shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
                break;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                break;
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            default:
                break;
        }

        window.open(shareUrl);

        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.description,
                url: article.url,
            });
        }
    };

    return (
        <Card className="news-card">
            <CardImg
                top
                width="100%"
                alt="news"
                src={article.urlToImage || "https://via.placeholder.com/400x200?text=No+Image"}
                className="news-card-img"
            />
            <CardBody className="news-card-body">
                <CardTitle tag="h5" className="news-card-title">{article.title || "No title"}</CardTitle>

                <div className="card-meta">
                    <span className="source-name">{article.source.name}</span>
                    {/* <span className="publish-date">{formatDate(article.publishedAt)}</span> */}
                </div>

                <CardSubtitle className="news-card-subtitle mb-2 text-muted" tag="h6">
                    {formatDate(article.publishedAt) || "Unknown date"}
                </CardSubtitle>

                <CardSubtitle className="news-card-author mb-2 text-muted" tag="h6">
                    Author: {article.author || "Unknown"}
                </CardSubtitle>
                <CardText className="news-card-text">{article.description || "No content available."}</CardText>
                <div className="text-center mb-2">
                    <Button target="_blank" href={article.url} color="primary" className="news-card-button">Read More</Button>
                </div>
            </CardBody>
            <CardFooter className="news-card-footer">
                <div className="d-flex justify-content-around align-items-center">
                    <FaThumbsUp role="button" className="news-card-action like-btn" />
                    <FaShareAlt role="button" className="news-card-action share-btn" onClick={() => handleShare("whatsapp")} />
                    <FaComment role="button" className="news-card-action comment-btn" />
                </div>
            </CardFooter>
        </Card>
    );
}

export default NewsCard;