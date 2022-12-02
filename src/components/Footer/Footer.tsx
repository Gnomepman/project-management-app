import React from 'react';
import RSSLogo from '../../assets/images/logo-rsschool.png';
import { useTranslation } from 'react-i18next';
import { TeamMembers } from '../TeamMembers/TeamMembers';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-light">
      <div className="container-xxl">
        <section className="d-flex justify-content-between align-items-center">
          <div className="d-xl-flex d-md-flex col-3 pb-2 pt-3">
            <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
              <img height="35" src={RSSLogo} alt="rss" />
            </a>
          </div>
          <div className="col-6">
            <TeamMembers />
          </div>
          <span className="text-center col-3 lh-sm">
            © {year}
            <span className="d-none d-sm-inline d-md-inline"> | {t('footer.rights')}</span>
          </span>
        </section>
      </div>
    </footer>
  );
};
