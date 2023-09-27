// This is the function we wrote earlier
export const copyTextToClipboard = async (text) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
};

export const getVCard = (data) => {
  console.log("vCard Data:", data);
  const vCard = `BEGIN:VCARD
VERSION:3.0
N:${data.last_name || ""};${data.first_name || ""};;
FN:${data.first_name || ""} ${data.last_name || ""}
ORG:${data.company_name || ""}
TITLE:${data.job_title || ""}
EMAIL:${data.email_address || ""}
TEL;TYPE=work,VOICE:${data.phone_number || ""}
TEL;TYPE=mobile,VOICE:${data.mobile_number || ""}
END:VCARD`;
  return vCard;
};
