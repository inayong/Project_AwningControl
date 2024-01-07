import React, { useEffect, useState } from 'react';
import { MdExpandLess } from "react-icons/md";

const ScrollButton = () => {
    const [topButton, setTopButton] = useState(false);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleScroll = () => {
        const { scrollY } = window;

        scrollY > 900 ? setTopButton(true) : setTopButton(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return topButton && (
        <div className='fixed bottom-10 right-96 cursor-pointer z-50'>
            <button onClick={scrollToTop} className="bg-blue-500 text-white p-2 rounded-full">
                <MdExpandLess size={30} />
            </button>
        </div>

    )
}

export default ScrollButton