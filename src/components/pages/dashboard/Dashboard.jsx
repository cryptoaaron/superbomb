import React from 'react';
import './Dashboard.css';
import './Responsive.css'

const Dashboard = () => {
    return (
        <div className='conatiner dashboard'>
            <h1 className='title'>Dashboard</h1>
            <div className='section-one'>
                <div>
                    <p className="sub-title">
                        $1.02M
                    </p>
                    <p className='small-text'>
                        Market Cap
                    </p>
                </div>
                <div>
                    <p className="sub-title">
                        60M
                    </p>
                    <p className='small-text'>
                        Circulating Supply
                    </p>
                </div>
                <div>
                    <p className="sub-title">
                        3K
                    </p>
                    <p className='small-text'>
                        sBOMB Holders
                    </p>
                </div>
                <div>
                    <p className="sub-title">
                        $0.12
                    </p>
                    <p className='small-text'>
                        sBOMB Price
                    </p>
                </div>
            </div>
            <div className='section-one'>
                <div>
                    <p className="sub-title sub-title-r">
                        Your Balance
                    </p>
                </div>
                <div>
                    <p className="sub-title">
                        $1,296.58
                    </p>
                    <p className='small-text'>
                        10,796 sBOMB
                    </p>
                </div>
            </div>
            <div className='section-one'>
                <div>
                    <p className="small-text-three">
                        Next Rebase in: <br />
                        APY: <br />
                        Daily ROI: <br />
                        # Value of Bombfire: <br />
                        $ Value of Bombfire: <br />
                        % Bombfire : Supply:
                    </p>
                </div>
                <div>
                    <p className="small-text-three text-end">
                        00:07:16 <br />
                        39.2% <br />
                        0.08% <br />
                        702,564 <br />
                        $60,047 <br />
                        6.03%:
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
