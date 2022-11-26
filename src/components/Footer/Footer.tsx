import React from 'react';
import RSSLogo from '../../assets/images/logo-rsschool.png';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-light">
      <div className="container-xxl">
        <section className="d-flex pb-1 pt-3 justify-content-between">
          <div className="d-flex">
            <h3 className="px-2 text-center mt-2">{t('footer.created')}</h3>
            <a href="https://rs.school/" target="_blank" rel="noreferrer">
              <img height="37" src={RSSLogo} alt="rss" />
            </a>
          </div>
          <div className="text-center p-3">
            © {year} | {t('footer.rights')}{' '}
          </div>
        </section>
      </div>
    </footer>
  );
};
