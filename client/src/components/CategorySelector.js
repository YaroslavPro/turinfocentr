import React from 'react';


export const CategorySelector = ({ all, categories, value, change }) => {

    return (
        <div className="breadcrumbs-wrapp">
            <div className="toggle-breadcrumbs">{value || all}</div>
            <ul className="breadcrumbs clearfix">
                {
                    categories.size && [null, ...categories].map((category, i) =>
                        <li key={i}>

                            {category === value ?
                                category || all
                                :
                                <span
                                    onClick={() => change(category)}
                                >
                                    {category || all}
                                </span>
                            }

                        </li>
                    )
                }
            </ul>
        </div>
    );
}