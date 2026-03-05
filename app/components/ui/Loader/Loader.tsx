import "./Loader.scss";

type LoaderProps = {
  fullscreen?: boolean; // si true => overlay plein écran
  label?: string; // texte optionnel
};

export default function Loader({
  fullscreen = true,
  label = "Chargement...",
}: LoaderProps) {
  if (!fullscreen) {
    return (
      <div
        className="loader-inline"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span className="spinner" aria-hidden="true" />
        <span className="loader-text">{label}</span>
      </div>
    );
  }

  return (
    <div
      className="loader-overlay"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loader-card">
        <span className="spinner" aria-hidden="true" />
        <span className="loader-text">{label}</span>
      </div>
    </div>
  );
}
