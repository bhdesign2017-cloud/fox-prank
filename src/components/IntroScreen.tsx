import heroFox from '../assets/fox-hero-web.png';

type IntroScreenProps = {
  onStart(): void;
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <section className="screen intro-screen" aria-labelledby="intro-title">
      <div className="intro-copy">
        <p className="kicker">狐狸研究所・不負責任測驗</p>
        <h1 id="intro-title">測出你是哪種狐狸？</h1>
        <p className="lede">五題就知道。大概啦。</p>
      </div>
      <div className="hero-art" aria-hidden="true">
        <img className="hero-fox" src={heroFox} alt="" />
        <span className="scribble">別亂按喔</span>
      </div>
      <button className="primary-button" type="button" onClick={onStart}>
        開始測驗
        <span aria-hidden="true"> →</span>
      </button>
      <p className="privacy-note">不會偷看你的相簿，狐狸沒那麼閒。</p>
    </section>
  );
}
