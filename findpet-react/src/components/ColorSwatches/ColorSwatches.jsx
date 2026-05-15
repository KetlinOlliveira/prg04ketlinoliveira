import { colorPalette } from "../../data/colorPalette";
import "./ColorSwatches.css";

function ColorSwatches() {
  return (
    <section className="swatches-section">
      <p className="section-label">Paleta completa</p>
      <h2 className="section-title">Passe o mouse sobre cada cor</h2>

      <div className="swatches">
        {colorPalette.map((color) => (
          <div key={color.id} className={`swatch ${color.className}`}>
            <div className="swatch-info">
              <div className="swatch-name">{color.name}</div>
              <div className="swatch-hex">{color.hex}</div>
              <div className="swatch-role">{color.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ColorSwatches;