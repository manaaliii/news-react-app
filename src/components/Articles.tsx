import React, {useState, useEffect} from 'react';
import Navbar from './Navbar.tsx';
import Article from './Article.tsx';
import axios from 'axios';
import useShowLoading from '../customHooks/useShowLoading.tsx';
import Loading from './Loading.tsx';




let articleList = []
const url = 'https://newsapi.org/v2/top-headlines/';
const apiKey =  'MY API KEY';

const Articles:React.FC = () => {
    const [category, setCategory] = useState<string>('general'); 
    const [page, setPage] = useState<number>(1);
    const [showReloading, setShowReloading] = useShowLoading();
    // const [loading, showLoading] = useShowLoading();
    const [end, setEnd] = useState<boolean>(false);
    const [news, setNews] = useState<any[]>([]);
    
    
    const fetchData = async (currentCategory:string) => {
        if(page <= 5){
         try {
             const response = await axios.get(url, {
                 params: {
                     country: 'in',
                     category: currentCategory,
                     apiKey: apiKey,
                     pageSize: 9,
                     page: page,
                 },
             });
 
             articleList = response.data.articles;
             setNews((prevNews) => {
                 const uniqueNews = articleList.filter((newArticle) => {
                     return !prevNews.some((existingArticle) => existingArticle.url === newArticle.url);
                 });
             
                 return [...prevNews, ...uniqueNews];
             });
             
         } catch (error) {
             console.log('Error fetching data:', error);
         }
        }
     };
      
    const handleCategory = (category:string) => {
        setCategory(category);
        fetchData(category);
        setNews([]);
        setPage(1)
        setShowReloading(2000);
    };   

    useEffect(() => {
        fetchData(category);
        if(page <= 5) {
            setEnd(false);
        }
        if(page >= 6)
        {
            setTimeout(()=>{

            }, 2000);
            setEnd(true);
        }
    }, [page]);
    

   
    useEffect(()=>{
        const handleCategoryScroll = async () => {
            try {   
                let { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                scrollTop = Math.round(scrollTop);
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
                if (isAtBottom && page <= 5) {
                    console.log('UPDATING PAGE:',page);
                    setPage((prevPage) => {
                        return prevPage + 1;
                    });
                }
            } catch (error) {
                console.log('error-scroll:', error);
            }
        };
        window.addEventListener('scroll', handleCategoryScroll);
        return ()=>{
            window.removeEventListener('scroll', handleCategoryScroll);
        }
    }, [])

    

    return (
        <>
            <Navbar currentCategory={category} handleCategory={handleCategory} />
            <Loading show={showReloading} />
            {!showReloading && (
                <div className='container'>
                    {news.map((article: any) => {
                        const { title, content, url, urlToImage } = article;
                        return (
                            <Article title={title} description={content} url={url} urlToImage={urlToImage} />
                        );
                    })}
                </div>
            )}
            {/* <Loading show={showLoading} /> */}
            {end && (
                <h2>No more news to display</h2>
            )}
        </>
    );
    
}

export default Articles;

