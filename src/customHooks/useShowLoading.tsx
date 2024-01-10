import {useState} from "react";
const useShowLoading = ():[boolean, (time:number)=>void] => {
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const handleShowLoading = (time:number) => {
        setShowLoading(true); // Show loading GIF
        setTimeout(() => {
            setShowLoading(false); // Hide loading GIF after 2 seconds
          }, time);
      };
      return [showLoading, handleShowLoading];
}

export default useShowLoading;