import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({
    addresses: false,
    contacts: false,
    faithPoint: false
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (key: keyof typeof openSubmenus) => {
    setOpenSubmenus(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>{t('home')}</h2>
        <nav>
          <ul>
            <li>
              <NavLink to="/home" onClick={toggleSidebar}>{t('home')}</NavLink>
            </li>
            <li>
              <NavLink to="/user" onClick={toggleSidebar}>{t('user')}</NavLink>
            </li>
            <li>
              <NavLink to="/role" onClick={toggleSidebar}>{t('role')}</NavLink>
            </li>
            <li>
              <span className="has-submenu" onClick={() => toggleSubmenu('addresses')}>{t('addresses')}</span>
              <ul className={`submenu ${openSubmenus.addresses ? 'open' : ''}`}>
                <li>
                  <NavLink to="/country" onClick={toggleSidebar}>{t('country')}</NavLink>
                </li>
                <li>
                  <NavLink to="/state" onClick={toggleSidebar}>{t('state')}</NavLink>
                </li>
                <li>
                  <NavLink to="/city" onClick={toggleSidebar}>{t('city')}</NavLink>
                </li>
                <li>
                  <NavLink to="/address" onClick={toggleSidebar}>{t('address')}</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <span className="has-submenu" onClick={() => toggleSubmenu('contacts')}>{t('contacts')}</span>
              <ul className={`submenu ${openSubmenus.contacts ? 'open' : ''}`}>
                <li>
                  <NavLink to="/contact" onClick={toggleSidebar}>{t('contact')}</NavLink>
                </li>
                <li>
                  <NavLink to="/socialMedia" onClick={toggleSidebar}>{t('socialMedia')}</NavLink>
                </li>
              </ul>
            </li>
            <li>
              <span className="has-submenu" onClick={() => toggleSubmenu('faithPoint')}>{t('faithPoint')}</span>
              <ul className={`submenu ${openSubmenus.faithPoint ? 'open' : ''}`}>
                <li>
                  <NavLink to="/faithPointImages" onClick={toggleSidebar}>{t('faithPointImages')}</NavLink>
                </li>
                <li>
                  <NavLink to="/faithPointRating" onClick={toggleSidebar}>{t('faithPointRating')}</NavLink>
                </li>
                <li>
                  <NavLink to="/faithPointReligions" onClick={toggleSidebar}>{t('faithPointReligions')}</NavLink>
                </li>
                <li>
                  <NavLink to="/faithPointSchedule" onClick={toggleSidebar}>{t('faithPointSchedule')}</NavLink>
                </li>
                <li>
                  <NavLink to="/faithPointServices" onClick={toggleSidebar}>{t('faithPointServices')}</NavLink>
                </li>
                <li>
                  <NavLink to="/faithPointSubscription" onClick={toggleSidebar}>{t('faithPointSubscription')}</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="language-selector">
          <button onClick={() => changeLanguage('en')}>EN</button>
          <button onClick={() => changeLanguage('pt')}>PT</button>
        </div>
      </div>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </div>
    </>
  );
};

export default Sidebar;
