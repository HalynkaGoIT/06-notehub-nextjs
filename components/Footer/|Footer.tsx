import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Aleksander Ievchuk</p>
          <p>
            Contact us:
            <a href="mailto:sashukman@gmail.com"> sashukman@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
