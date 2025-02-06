const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__copyright">© Valentine's Day Cards - {new Date().getFullYear()} Joseph Young</p>
            <p className="footer__support">Want to support me? Click the link below!</p>
            <a href="https://www.buymeacoffee.com/josephmyoung" target="_blank">
                <img className="footer__coffee" src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png" alt="Buy Me A Coffee" />
            </a>
        </footer>

    )
}

export default Footer;