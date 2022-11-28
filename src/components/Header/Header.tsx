import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Navbar } from 'react-bootstrap';
import Logo from '../../assets/images/pm-logo.jpg';
import { languages } from '../../utils/languages';
import { AuthSection } from '../AuthSection/AuthSection';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 10;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Navbar
      sticky="top"
      style={{
        transition: '1s ease',
        backgroundColor: navBackground ? '#9BB3DA ' : 'transparent',
      }}
    >
      <div className="container-xxl">
        <Navbar.Collapse>
          <NavLink to="/">
            <img
              src={Logo}
              width="100"
              height="50"
              className="d-inline-block align-top"
              alt="pm-app-logo"
            />
          </NavLink>
          <NavDropdown title={t('auth.language')} className="px-2">
            {languages.map(({ code, name }) => (
              <NavDropdown.Item
                key={name}
                onClick={() => {
                  changeLanguage(code);
                }}
              >
                {name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Navbar.Collapse>
        <NavLink className="mr-10 px-2" to="/test">
          <Button variant="danger"> Test</Button>
        </NavLink>
        <AuthSection />
      </div>
    </Navbar>
  );
}
