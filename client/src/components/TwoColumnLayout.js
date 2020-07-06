import React from 'react';

export const TwoColumnLayout = ({ children, selector, sidebar, title, frame }) => (
    <div className="content">
        <div className="container">
            <h2 className="page-title">{title}</h2>

            {selector}

            <div className={`page-wrapp ${frame && "page-wrapp-white"}`} >
                <div className="row">
                    <div className="col-md-9 col-sm-8 page-content-left">

                        {children}

                    </div>
                    <div className="page-sidebar col-md-3 col-sm-4">

                        {sidebar}

                    </div>
                </div>
            </div>
        </div>
    </div>
);