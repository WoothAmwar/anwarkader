import React from "react";

const ResumePage = () => {
  const pdfUrl = `${process.env.PUBLIC_URL}/Anwar_Kader_Resume.pdf`;
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        title="Anwar Kader Resume"
        src={pdfUrl}
        style={{ border: "none", width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ResumePage;
