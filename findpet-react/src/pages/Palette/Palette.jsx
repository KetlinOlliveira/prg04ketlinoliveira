import { Link } from "react-router-dom";
import ColorSwatches from "../../components/ColorSwatches/ColorSwatches";
import { colorPsychology } from "../../data/colorPalette";
import "./Palette.css";

function Palette() {
  return (
    <main className="palette-page">
      <header className="palette-header">
        <Link to="/" className="close-palette">
          ✕
        </Link>

        <p className="eyebrow">
          Sistema de adoção de animais · identidade visual
        </p>

        <h1>
          Raízes <span>&</span> Afeto
        </h1>

        <p>
          Uma paleta construída sobre tons de terra, afeto e responsabilidade —
          para conectar pessoas a animais que esperam por um lar.
        </p>
      </header>

      <ColorSwatches />

      <section className="psicologia-section">
        <div className="psicologia-inner">
          <p className="section-label">Por que essas cores</p>
          <h2 className="section-title">Psicologia das cores</h2>

          <div className="psy-list">
            {colorPsychology.map((item) => (
              <div key={item.id} className="psy-row">
                <div className={`psy-dot ${item.className}`}></div>

                <div className="psy-text">
                  <strong>{item.title}</strong> — {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Palette;