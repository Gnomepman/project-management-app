import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navbar } from 'react-bootstrap';
import Logo from '../../assets/images/pm-logo.jpg';
import { languages } from '../../utils/languages';
import { AuthSection } from '../AuthSection/AuthSection';
import React from 'react';

export function Header() {
  const { t } = useTranslation();

  return (
    <Navbar bg="light">
      <Navbar.Collapse>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            width="100"
            height="50"
            className="d-inline-block align-top"
            alt="pm-app-logo"
          />
        </Navbar.Brand>
        <NavDropdown title={t('language')} id="basic-nav-dropdown">
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
      <Nav.Item>
        <Nav.Link href="/about">{t('about')}</Nav.Link>
      </Nav.Item>
      <AuthSection />
    </Navbar>
  );
}
