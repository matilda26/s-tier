import React, { useRef } from "react";
import { Helmet } from "react-helmet";

import Layout from "components/Layout";
import Row from "components/Row";
import Container from "components/Container";
import html2canvas from "html2canvas";

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

  const refresh = () => {
    window.location.reload();
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
        <div className="page-home__footer">
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
          <button className="refresh" onClick={refresh}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.6455 12.1394C13.7824 11.9531 14.022 11.8677 14.2413 11.9408C14.5508 12.044 14.6847 12.4085 14.494 12.6731C13.0413 14.6882 10.6739 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C11.8337 0 15.0376 2.69664 15.8183 6.29658L16.841 5.01024C17.0128 4.79409 17.3274 4.75818 17.5435 4.93003C17.7597 5.10189 17.7956 5.41643 17.6237 5.63258L15.8914 7.81146L15.6447 8.12174L15.2863 7.95233L12.743 6.75005C12.4933 6.63203 12.3866 6.33398 12.5046 6.08432C12.6227 5.83467 12.9207 5.72796 13.1704 5.84597L14.8698 6.64933C14.2404 3.42965 11.4039 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C10.3172 15 12.3715 13.8741 13.6455 12.1394Z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;
