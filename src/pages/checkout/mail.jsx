import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import logopic from "../../assets/logo.jpeg";

// interface LinearLoginCodeEmailProps {
//   validationCode?: string;
// }

// const baseUrl = process.env.REACT_APP_Backend_URL
//   ? `https://${process.env.REACT_APP_Backend_URL}`
//   : "";

export const LinearLoginCodeEmail = ({ validationCode }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Your Confirmation code for AldamanyCamp</Preview>
      <Container style={container}>
        <Img
          src={`https://aldamanycamp.info/assets/logo-BQdeYkjs.jpeg` || logopic}
          width="42"
          height="42"
          alt="Linear"
          style={logo}
        />
        <Heading style={heading}>Your Confirmation code </Heading>
        <Section style={buttonContainer}>
          <Button
            style={button}
            href={`https://www.aldamanycamp.info/mybooking2?confid=${validationCode} `}
          >
            Check Room
          </Button>
        </Section>
        <Text style={paragraph}>
          {/* // This link and code will only be valid for the next 5 minutes. If */}
          the link does not work, you can use verification code directly:
        </Text>
        <code style={code}>{validationCode}</code>
        <Hr style={hr} />
        <Link
          href={`https://www.aldamanycamp.info/mybooking2?confid=${validationCode} `}
          style={reportLink}
        >
          MyBooking
        </Link>
      </Container>
    </Body>
  </Html>
);

LinearLoginCodeEmail.PreviewProps = {
  validationCode: "tt226-5398x",
};

export default LinearLoginCodeEmail;

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#5e6ad2",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "11px 23px",
};

const reportLink = {
  fontSize: "14px",
  color: "#b4becc",
};

const hr = {
  borderColor: "#dfe1e4",
  margin: "42px 0 26px",
};

const code = {
  fontFamily: "monospace",
  fontWeight: "700",
  padding: "1px 4px",
  backgroundColor: "#dfe1e4",
  letterSpacing: "-0.3px",
  fontSize: "21px",
  borderRadius: "4px",
  color: "#3c4149",
};
