import { useState } from "react";

import { copyTextToClipboard } from "../util/";

import QRCode from "react-qr-code";

const VCardPreview = ({ vCard, onStartAgain }) => {
  const [showVCard, setShowVCard] = useState(false);
  return (
    <div className="vcard">
      <h2>Contact Details</h2>
      {showVCard ? (
        <pre className="card-preview">{vCard}</pre>
      ) : (
        <QRCode
          size={256}
          className="card-preview"
          viewBox={`0 0 256 256`}
          value={vCard}
        />
      )}
      <button className="btn" onClick={() => copyTextToClipboard(vCard)}>
        Copy to clipboard
      </button>
      <button className="btn" onClick={() => setShowVCard(!showVCard)}>
        Show {showVCard ? "QR Code" : "vCard"}
      </button>
      <button className="btn" onClick={onStartAgain}>
        Scan new Card
      </button>
    </div>
  );
};

export default VCardPreview;
