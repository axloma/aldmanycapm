// Chakra UI Imports ;
import { Box, Flex } from "@chakra-ui/react";

// Saas UI Imports ;
import { Persona, Form, FormLayout, Field, SubmitButton } from "@saas-ui/react";
import { useState } from "react";

// Custom Hooks ;
import usePasswordMatch from "./pwd";

export const UserSettings = () => {
  const {
    password,
    confirmPassword,
    isMatch,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = usePasswordMatch();

  const handleSubmit = (event) => {
    console.log(event);
    // Handle form submission here
  };
  const [user, SetUser] = useState(
    JSON.parse(localStorage.getItem("userProfile"))
  );
  const widthform = "100%";
  return (
    <>
      <Box padding="8">
        <Flex
          alignItems="center"
          marginBlock="4"
          style={{ boxShadow: "5px 10px 8px 10px black" }}
        >
          <Persona
            name={user?.name || user?.username || "Velda Kiara"}
            secondaryLabel={
              <div style={{ backgroundColor: "black" }}>
                {user?.email || "Pro Plan"}{" "}
              </div>
            }
            size="lg"
            letterSpacing="0.78px"
          />
        </Flex>

        <Form
          onSubmit={handleSubmit}
          defaultValues={{
            firstName: user?.username,
            lastName: user?.username?.split(" ")[1],
            email: user?.email || "velda@gmail.com",
          }}
          style={{
            color: "gray",
            fontSize: "1.3rem",
            fontWeight: "bold",
            boxShadow: "5px 10px 8px 10px black",
            // minwidth: "100vw",

            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }}
          className="USERSETTING"
        >
          <FormLayout>
            <Field
              backgroundColor="white"
              textColor="black"
              name="firstName"
              label="First Name"
              width={widthform}
              rules={{ required: true }}
            />
            <Field
              backgroundColor="white"
              textColor="black"
              name="lastName"
              label="Last Name"
              width={widthform}
              rules={{ required: true }}
            />
            <Field
              backgroundColor="white"
              textColor="black"
              name="email"
              label="Email"
              type="email"
              rules={{ required: true }}
              width={widthform}
            />
            <Field
              fontFamily="mono"
              backgroundColor="white"
              textColor="black"
              type="password"
              name="password"
              label=" New Password"
              value={password}
              width={widthform}
              rules={{ required: true }}
              onChange={handlePasswordChange}
            />
            <Field
              fontFamily="mono"
              backgroundColor="white"
              textColor="black"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={confirmPassword}
              width={widthform}
              rules={{ required: true }}
              onChange={handleConfirmPasswordChange}
            />
            {!isMatch && <p className="highlight">Passwords do not match</p>}
            <SubmitButton marginBlockStart="10px" disableIfInvalid>
              Save
            </SubmitButton>
          </FormLayout>
        </Form>
      </Box>
    </>
  );
};
