import React from "react";
import '../CSS/Article.css';

interface ArticleProps {
    title:string;
    ref?:unknown;
    url: string;
    urlToImage: string | null | undefined;
    description:string;
}


const maxLengthTitle = 70;
const maxLengthDescription = 200;

const handleString = (description:string, maxLength: number):string => {
    if(description?.length > maxLength) {
        return description.slice(0, maxLength) + '...';
    }
    return description;

}

const handleImageError = (event) => {
    // Handle image loading error, replace with an alternative image
    event.target.src = 'https://www.shutterstock.com/image-vector/smile-face-yellow-postervector-illustration-260nw-1047179809.jpg'; // Replace with your alternative image path
  };

const Article:React.FC<ArticleProps> = ({title, url, ref, urlToImage, description}) => {
    // console.log(urlToImage);    
    return(<>
       <div className="card">
         {urlToImage !==null ? <img src={urlToImage} onError={handleImageError} alt="image loading" /> : 
         <img src='https://www.shutterstock.com/image-vector/smile-face-yellow-postervector-illustration-260nw-1047179809.jpg' alt="article image" />}
         <h3>{handleString(title, maxLengthTitle)}</h3>
         <p>{handleString(description, maxLengthDescription)}</p>
         <a href={url} className="read--more"  target="_blank">Read More</a>

       </div>
    </>)
}

export default Article;