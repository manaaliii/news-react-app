import React from 'react'

interface LoadingProps{
    show: boolean
    
}

const Loading:React.FC<LoadingProps> = ({show}) => {
  return (
   <>
   {show &&  <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="Loading..." />}
   </>
  )
}

export default Loading