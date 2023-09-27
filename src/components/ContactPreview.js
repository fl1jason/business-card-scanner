import { useState } from "react";

import { uploadvCard } from "../firebase/index";

import { copyTextToClipboard, getVCard } from "../util";

import QRCode from "react-qr-code";

const ContactPreview = ({ contactData, onStartAgain }) => {
  console.log("vCard Data:", contactData);
  const [showVCard, setShowVCard] = useState(false);
  const [vCardUrl, setVCardUrl] = useState("");

  const onSaveToContacts = async (data) => {
    const vCardUrl = await uploadvCard(data.first_name, getVCard(data));
    setVCardUrl(vCardUrl);
  };

  const vCard = getVCard(contactData);
  console.log("vCard:", vCard);

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
      {vCardUrl && (
        <a href={vCardUrl} target="_blank" rel="noreferrer">
          Add to Contacts
        </a>
      )}
      <button className="btn" onClick={() => copyTextToClipboard(vCard)}>
        Copy to clipboard
      </button>
      <button className="btn" onClick={() => onSaveToContacts(contactData)}>
        Save to Contacts
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

export default ContactPreview;
