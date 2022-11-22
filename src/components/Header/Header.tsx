import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navbar } from 'react-bootstrap';
import Logo from '../../assets/images/pm-logo.jpg';
import { languages } from '../../utils/languages';
import { AuthSection } from '../AuthSection/AuthSection';
import React from 'react';
import { NavLink } from 'react-router-dom';

export function Header() {
  const { t } = useTranslation();

  return (
    <Navbar bg="light">
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

      <AuthSection />
    </Navbar>
  );
}
