import axios from 'axios';
import { FaShareAlt, FaThumbsUp, FaComment } from "react-icons/fa";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, CardImg, CardFooter } from 'reactstrap';
import '../styles/NewsCard.css';
import { useState } from 'react';
import ReactDOM from "react-dom";
import { toast } from "react-toastify";  

function NewsCard({ article }) {
    const BaseURL = import.meta.env.VITE_API_BASE_URL;
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState("");

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleShare = (platform) => {
        const url = encodeURIComponent(article.url);
        const text = encodeURIComponent(article.title);

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

    const handleLike = async () => {
        let articleData = {
            url: article.url,
            title: article.title,
            urlToImage: article.urlToImage
        }
        try {
            const res = await axios.post(`${BaseURL}/react/like`, articleData, {
                withCredentials: true,
            });
            console.log("Result during like >> ", res.data);
            toast.success("Your like is recorded!");
        } catch (error) {
            console.log("Error during liking article", error);
            toast.error("❌ Something went wrong during like operation.");
        }
    };

    const handleComment = async () => {
        if (!commentText.trim()) {
            toast.warning("⚠️ Comment cannot be empty");
            return;
        }

        const commentData = { comment: commentText };

        try {
            const res = await axios.post(`${BaseURL}/react/comment`, commentData, {
                withCredentials: true,
            });
            console.log("Result during comment >> ", res.data);
            toast.success("💬 Your comment is recorded!");
            setCommentText("");
            setShowCommentBox(false);
        } catch (err) {
            console.error("Error during commenting", err);
            toast.error("❌ Failed to add comment");
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
                    <FaThumbsUp role="button" className="news-card-action like-btn" onClick={handleLike} />
                    <FaShareAlt role="button" className="news-card-action share-btn" onClick={() => handleShare("whatsapp")} />
                    <FaComment role="button" className="news-card-action comment-btn" onClick={() => setShowCommentBox(true)} />
                </div>
            </CardFooter>

            {showCommentBox &&
                ReactDOM.createPortal(
                    <div className="comment-popup">
                        <div className="comment-box">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write your comment..."
                                rows={3}
                            />
                            <div className="comment-actions">
                                <Button color="primary" onClick={handleComment}>Submit</Button>
                                <Button color="secondary" onClick={() => setShowCommentBox(false)}>Cancel</Button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )
            }
        </Card>
    );
}

export default NewsCard;
