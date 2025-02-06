const About = () => {
    return (
        <div>

            <div className="about">
                <section className="about__container">
                    <h1 className="about__title">About Valentine's Day Cards</h1>

                    <p className="about__description">
                        Create and share personalized Valentine's Day messages with your loved ones in this public gallery!
                    </p>

                    <h2 className="about__subtitle">Features</h2>
                    <ul className="about__features-list">
                        <li className="about__feature-item">Write your own heartfelt message</li>
                        <li className="about__feature-item">Let AI enhance your message with romantic flair</li>
                        <li className="about__feature-item">Generate sweet, romantic messages automatically</li>
                        <li className="about__feature-item">Create fun, playful Valentine's messages</li>
                        <li className="about__feature-item">Get a message in the style of RuPaul, Flavor Flav, or Neil deGrasse Tyson!</li>
                    </ul>

                    <div className="about__how-it-works">
                        <h2 className="about__subtitle">How It Works</h2>
                        <p className="about__description">
                            Simply choose your preferred message style, enter the recipient's name,
                            and let our AI-powered system help you create the perfect Valentine's Day message.
                            You can then send your card directly via email or save it for later!
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default About