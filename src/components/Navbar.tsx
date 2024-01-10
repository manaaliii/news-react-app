import React from 'react';
import '../CSS/Navbar.css';
const categories = ['general', 'business', 'entertainment', 'health', 
                    'science', 'sports', 'technology'];

interface NavbarProps {
    currentCategory: string;
    handleCategory: (category:string) => void;

}
const styleNavOption : {textShadow:  string} = {
    textShadow:  '3px 3px 3px pink'
}
const Navbar:React.FC<NavbarProps> = ({currentCategory, handleCategory}) => {
    return (
        <nav>
            <ul>
                {categories.map(category=>{
                    return <li key={category} style={currentCategory===category ? styleNavOption : {}}
                    onClick={()=>{handleCategory(category)}}>
                        {category}
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default Navbar;