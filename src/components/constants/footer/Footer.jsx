import React from 'react';
import './Footer.css';
import './Responsive.css';

const Footer = () => {
    return (
        <div className="footer">
            <div className="content">

                <ul className="m-auto">
                    {/*
                    <li className="my-auto">
                        <a aria-current="page" href="/"><img src={twitter} alt="twitter" /></a>
                    </li>
                    <li className="my-auto">
                        <a href="/"><img src={discord} alt="discord" /></a>
                    </li>
                   */}
                    <li className=" btn btn-lg btn-BuysBomb">
                        <a href="https://www.bombswap.xyz/swap">Buy sBomb <i className="fa-solid fa-arrow-right ms-1"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
