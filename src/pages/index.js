import React, { useRef } from "react";
import { Helmet } from "react-helmet";

import Layout from "components/Layout";
import Row from "components/Row";
import Container from "components/Container";
import html2canvas from 'html2canvas';

const IndexPage = () => {
  const allRowsRef = useRef(null);

  const downloadAll = async () => {
    const rowContainer = allRowsRef.current;
    try {
      const rowContainerData = await html2canvas(rowContainer, {
        useCORS: true,
        logging: true,
      });
      rowContainerData.style.display = "none";
      document.body.appendChild(rowContainerData);
      const image = rowContainerData
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.setAttribute("download", `$s-tier.png`);
      a.setAttribute("href", image);
      a.click();
    } catch (error) {
      return console.error(
        "Error capturing rowContainer with html2canvas:",
        error
      );
    }
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>s-tier</title>
      </Helmet>
      <Container>
        <div className="row-container" ref={allRowsRef}>
          <Row title="S" bgColor="#EE8683" />
          <Row title="A" bgColor="#F5C189" />
          <Row title="B" bgColor="#F9DF8D" />
          <Row title="C" bgColor="#FEFF91" />
          <Row title="D" bgColor="#CCFD8F" />
          <Row title="E" bgColor="#A0FC8E" />
          <Row title="F" bgColor="#A0FCFD" />
        </div>
      </Container>
      <Container>
        <button className="download-all" onClick={downloadAll}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="13"
            viewBox="0 0 18 13"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.49997 0.5C9.49997 0.223858 9.27612 0 8.99997 0C8.72383 0 8.49997 0.223858 8.49997 0.5V7.79289L6.17155 5.46447C5.97628 5.2692 5.6597 5.2692 5.46444 5.46447C5.26918 5.65973 5.26918 5.97631 5.46444 6.17157L8.64642 9.35355C8.84168 9.54882 9.15827 9.54882 9.35353 9.35355L12.5355 6.17157C12.7308 5.97631 12.7308 5.65973 12.5355 5.46447C12.3402 5.2692 12.0237 5.2692 11.8284 5.46447L9.49997 7.79289V0.5ZM1.5 7C1.5 6.72386 1.27614 6.5 1 6.5C0.723858 6.5 0.5 6.72386 0.5 7V12C0.5 12.2761 0.723858 12.5 1 12.5H17C17.2761 12.5 17.5 12.2761 17.5 12V7C17.5 6.72386 17.2761 6.5 17 6.5C16.7239 6.5 16.5 6.72386 16.5 7V11.5H1.5V7Z"
              fill="white"
            />
          </svg>
          <span>download all</span>
        </button>
      </Container>
    </Layout>
  );
};

export default IndexPage;
