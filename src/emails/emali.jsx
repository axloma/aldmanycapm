import * as React from "react";
import { Html, Button } from "@react-email/components";

export function Email(props) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url} style={{ cursor: "pointer" }}>
        Click me
      </Button>
    </Html>
  );
}

export default Email;
