import React from 'react';

export const HeaderBlock = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="head row">
                    <div className="col-md-4 col-sm-4 col-xs-6 logo-wrapp">
                        <a href="/" className="logo">
                            <img src="/img/logo.png" alt="" />
                        </a>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-6 head-about"></div>
                    <div className="col-sm-4 visible-sm search-pl-wrapp">
                        <form action="/poisk/" className="search-pl">
                            <input type="text" className="search-input" placeholder="ПОИСК" />
                            <button className="search-submit"></button>
                        </form>
                    </div>
                    <div className="clearfix visible-sm visible-xs"></div>
                    <div className="col-md-5 head-menu-wrapp hidden-sm">
                        <ul className="head-menu row">
                            <li className="col-md-4 col-sm-4 col-xs-4">

                                <div className="head-menu-block">
                                    <a href="/marshruty/">
                                        <span>
                                            <i className="head-menu-icon-1"></i>
                                                Маршруты <br />
                                                и туры
                                            </span>
                                    </a>
                                </div>

                            </li>
                            <li className="col-md-4 col-sm-4 col-xs-4">

                                <div className="head-menu-block">
                                    <a href="/sobytija/">
                                        <span>
                                            <i className="head-menu-icon-2"></i>
                                                Календарь <br />
                                                событий
                                            </span>
                                    </a>
                                </div>

                            </li>
                            <li className="col-md-4 col-sm-4 col-xs-4">

                                <div className="head-menu-block">
                                    <a href="/turuslugi/">
                                        <span>
                                            <i className="head-menu-icon-3"></i>
                                                Выбор <br />
                                                туруслуг
                                            </span>
                                    </a>
                                </div>

                            </li>
                        </ul>
                    </div>
                </div>

                <nav className="nav-top clearfix">
                    <ul className="menu-top">
                        <li>
                            <a href="/o-gorode/">О городе</a>
                        </li>
                        <li>
                            <a href="/dostoprimechatelnosti/">Что посмотреть</a>
                        </li>
                        <li>
                            <a href="/mesta/">Места</a>
                        </li>
                        <li>
                            <a href="/chto-kupit/">Что купить</a>
                        </li>
                        <li>
                            <a href="/ugolok-kraeveda/">Уголок краеведа</a>
                        </li>
                        <li>
                            <a href="/foto-i-video/">Фото и видео</a>
                        </li>
                        <li>
                            <a href="/karta/">Карта</a>
                        </li>
                    </ul>
                    <form action="/poisk/" method="get" target="_self" className="search">
                        <input type="search" name="text" className="search-input" placeholder="ПОИСК" />
                        <button type="submit" className="search-submit"></button>
                    </form>
                </nav>

            </div>
        </header>
    );
}