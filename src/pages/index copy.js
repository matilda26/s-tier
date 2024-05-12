import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";

import Layout from "components/Layout";
import Row from "components/Row";
import Container from "components/Container";

import AWS from "aws-sdk";

import img_gatsby from "assets/images/gatsby-astronaut.png";

const IndexPage = () => {
  const accessKeyId = "AKIASMNJQEDNOOZOH5PG";
  const secretAccessKey = "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";
  const [globalFolderName, setGlobalFolderName] = useState(null);
  const [fileUploadError, setFileUploadError] = useState({
    isError: null,
    timestamp: Date.now(),
  });

  const allRowsRef = useRef(null);

  AWS.config.update({
    region: "ap-southeast-2",
    credentials: new AWS.Credentials(accessKeyId, secretAccessKey),
  });

  const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-AU").split("/").join("-");
    const formattedTime = date.toLocaleTimeString("en-AU", { hour12: false });
    const uuid = `${formattedDate}-${formattedTime}`;
    setGlobalFolderName(uuid);
  }, []);

  const handleImageUpload = (imageUrl, error) => {
    // Increment upload attempt counter on every upload attempt
    if (error == "fileType") {
      console.log("ERROR: fileType");
      setFileUploadError({ isError: "fileType", timestamp: Date.now() });
    } else if (error == "fileSize") {
      console.log("ERROR: fileSize");
      setFileUploadError({ isError: "fileSize", timestamp: Date.now() });
    } else if (error == "uploadError") {
      setFileUploadError({ isError: "uploadError", timestamp: Date.now() });
    } else {
      // Reset error states on successful upload
      setFileUploadError({ isError: null, timestamp: Date.now() });
    }

    // setImageUploading(false);
  };

  const uploadImageToS3 = async (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    event.target.value = ""; // Reset the input after file selection

    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      handleImageUpload(null, "fileType");
      return;
    }

    if (file.size / (1024 * 1024) > 6) {
      handleImageUpload(null, "fileSize");
      return;
    }

    const uploadParams = {
      Bucket: "customiser.threadheads.com",
      Key: `${globalFolderName}/uploaded-images/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: "public-read",
    };

    return s3
      .upload(uploadParams)
      .promise()
      .then((data) => {
        console.log("Upload Success", data.Location);
        handleImageUpload(data.Location, "");
      })
      .catch((err) => {
        console.error("Upload Error", err.message);
        handleImageUpload(null, "uploadError");
      });
  };

  const downloadAll = () => {
    console.log("download all");
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
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
