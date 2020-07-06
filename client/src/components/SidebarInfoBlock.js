import React from 'react';

export const SidebarInfoBlock = () => {

    return (
        <div className="sidebar-widget hidden-xs">
            <div className="sidebar-widget-img">
                <img src="/img/sidebar-widget-info.png" alt="" />
            </div>
            <div className="sidebar-widget-title">Туристский информационный центр</div>
            <div className="widget-org-text">ОТВЕТИМ НА ВАШИ ВОПРОСЫ,<br /> ПОМОЖЕМ В ВЫБОРЕ ТУРУСЛУГ</div>
            <div className="widget-reserve-tel">
                <a href="tel:+79066510047" className="tel">+7&nbsp;(906)&nbsp;651-00-47</a>
            </div>
        </div>
    )
};