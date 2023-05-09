import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Twemoji } from "react-emoji-render";
import {
  Button,
  Input,
  Typography,
  Textarea,
  Grid,
  IconButton,
  Box,
  Option,
} from "@mui/joy";
import {
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import mixpanel from "./mixpanel.js";

// import { createTheme, ThemeProvider } from "@mui/material/styles";

function Main() {
  const [yourName, setYourName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [product, setProduct] = useState("");
  const [team, setTeam] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [roleRequirement, setRoleRequirement] = useState("");
  const [recipient, setRecipient] = useState("recruiter");
  const [relationship, setRelationship] = useState("school alumni");
  const [ask, setAsk] = useState("a chat");
  const [outputText, setOutputText] = useState("");
  const [selfIntro, setSelfIntro] = useState("");
  const [moreRequest, setMoreRequest] = useState("");
  const [recipientName, setRecipientName] = useState("");

  const [generatedMessage, setGeneratedMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const receivedMessageRef = useRef();

  const [education, setEducation] = useState([
    { school: "", degree: "", major: "", courses: "" },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteEducation = (indexToDelete) => {
    const newEducation = education.filter(
      (_, index) => index !== indexToDelete
    );
    setEducation(newEducation);
  };

  const [messageStyle, setMessageStyle] = useState("linkedin");
  const [wordDetails, setWordDetails] = useState("50");

  const copyToClipboard = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(receivedMessage).then(
      () => {
        console.log("Copied to clipboard!");
      },
      (err) => {
        console.error("Error copying to clipboard:", err);
      }
    );
  };

  useEffect(() => {
    loadStoredValues();
    mixpanel.track("PageView", { page: "Home" });
  }, []);

  const loadStoredValues = () => {
    const storedCompany = localStorage.getItem("targetCompany");
    const storedRole = localStorage.getItem("targetRole");
    const storedRoleRequirements = localStorage.getItem("roleRequirement");
    const storedName = localStorage.getItem("yourName");
    const storedIntro = localStorage.getItem("selfIntro");
    const storedRecipientName = localStorage.getItem("recipientName");

    if (storedCompany) setTargetCompany(storedCompany);
    if (storedRole) setTargetRole(storedRole);
    if (storedRoleRequirements) setRoleRequirement(storedRoleRequirements);
    if (storedName) setYourName(storedName);
    if (storedIntro) setSelfIntro(storedIntro);
    if (storedRecipientName) setRecipientName(storedRecipientName);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setYourName(value);
    localStorage.setItem("yourName", value);
  };

  const handleCompanyChange = (e) => {
    const value = e.target.value;
    setTargetCompany(value);
    localStorage.setItem("targetCompany", value);
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setTargetRole(value);
    localStorage.setItem("targetrole", value);
  };

  const handleSelfIntroChange = (e) => {
    const value = e.target.value;
    setSelfIntro(value);
    localStorage.setItem("selfIntro", value);
  };

  const handleRoleRequirementsChange = (e) => {
    const value = e.target.value;
    setRoleRequirement(value);
    localStorage.setItem("roleRequirement", value);
  };

  const handleRecipientNameChange = (e) => {
    const value = e.target.value;
    setRecipientName(value);
    localStorage.setItem("recipientName", value);
  };

  const handleGenerateClick = async () => {
    mixpanel.track("Conversion", { type: "Button click" });
    setIsLoading(true);
    const message = `Write a ${messageStyle} message to ${recipientName}, the ${recipient} at ${targetCompany} who ${relationship} to ask for ${ask}. Personalize this message to highlight why I am a fit to this role. Finish the message in ${wordDetails} words. 
    \n The job descrpiton of ${targetRole}:${roleRequirement}. \n. My name is ${yourName}: ${selfIntro}. ${moreRequest}`;

    setGeneratedMessage(message);

    // Send the generated message to ChatGPT
    await sendMessageToChatGPT(message);
    setIsLoading(false);

    sendButtonClickEvent();
  };

  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const scrollToReceivedMessage = () => {
    receivedMessageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendButtonClickEvent = () => {
    window.gtag("event", "button_click", {
      button_label: "Write the Message",
    });
    console.log("Button click event sent to Google Analytics");
    console.log(isXsScreen);
  };

  const sendMessageToChatGPT = async (message) => {
    setReceivedMessage(null);
    const prompt = message;
    const maxTokens = 200; // Adjust this value based on your requirements

    const response = await fetch(
      " https://job-letter-server.herokuapp.com/api/generate-response",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      }
    );

    const data = await response.json();
    console.log("API response:", data);

    if (data.choices && data.choices[0] && data.choices[0].message) {
      const chatGPTResponse = data.choices[0].message.content;
      console.log("ChatGPT response:", chatGPTResponse);
      setReceivedMessage(chatGPTResponse);
      console.log("success!");
    } else {
      console.log("Unexpected response structure:", data);
    }
  };
  return (
    <Grid
      container
      spacing={8}
      sx={{ flexGrow: 1, overflowY: "scroll", maxHeight: "2400px" }}
    >
      <Grid xs={12}>
        <div className="fixed-message">
          <Typography>
            <Twemoji text="✨" />
            Developed by{" "}
            <a
              className="link-to-profile"
              variant="outlined"
              href="https://www.linkedin.com/in/zihui-georgia-lin-5b7600187/"
              fontSize="md"
              borderRadius="sm"
              target="_blank"
              rel="noopener"
            >
              {" "}
              Georgia Lin
            </a>
            <Twemoji text="👩🏻‍💻" />
            using ChatGPT {isXsScreen}
          </Typography>
        </div>
      </Grid>

      <Grid xs={12} md={6} sx={{ backgroundColor: "#f7F7F7" }}>
        <Box
          pb={5}
          pl={5}
          sx={{
            maxHeight: "100vh",
            overflowY: "auto",
            padding: "16px",
            paddingBottom: "50px",
          }}
        >
          <Box pt={2} pl={5}>
            <a
              href="https://www.producthunt.com/posts/job-letter?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-job&#0045;letter"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=392646&theme=light"
                alt="✍️Job&#0032;Letter -
    &#0032;Craft&#0032;tailored&#0044;&#0032;heartfelt&#0032;cold&#0032;message&#0032;using&#0032;ChatGPT
    | Product Hunt"
                style={{ width: "250px", height: "54px" }}
                width="250"
                height="54"
              />
            </a>
          </Box>
          <Box pt={3} pl={5}>
            <Box pb={2}>
              <Typography level="h4">
                {" "}
                <Twemoji text="📄" />
                Write cold message using ChatGPT
              </Typography>
            </Box>
            <Box pb={2}>
              <Typography textColor={"neutral.500"} gutterBottom={true}>
                Craft job hunt cold emails in seconds - land your dream job with
                ease! Tailor based on your own experience and job description
              </Typography>
            </Box>
          </Box>
          <Box pt={2} pl={5} pb={3}>
            {/* Name and Education inputs */}

            <Box pb={3}>
              <Typography htmlFor="name" level="h6" textColor={"info.400"}>
                <Twemoji text="👩🏻‍💻" />
                Your Name:
              </Typography>
              <div className="input-style">
                <Input
                  color="string"
                  id="name"
                  value={yourName}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                />
              </div>
            </Box>
            <Box pb={3}>
              <Typography htmlFor="selfIntro" level="h6" textColor={"info.400"}>
                <Twemoji text="💬" />
                Self Introduction:
              </Typography>
              <Textarea
                // className="scrollable-text-box"
                id="selfIntro"
                maxRows={6}
                value={selfIntro}
                onChange={handleSelfIntroChange}
                color="string"
                placeholder="Type your self introduction here..."
              ></Textarea>
            </Box>
            <div>
              <Box pb={3}>
                <Typography
                  htmlFor="targetRole"
                  level="h6"
                  textColor={"info.400"}
                >
                  <Twemoji text="💼" />
                  Role:
                </Typography>
                <div className="input-style">
                  <Input
                    color="string"
                    id="targetRole"
                    value={targetRole}
                    onChange={handleRoleChange}
                    placeholder="Enter target role"
                  />
                </div>
              </Box>
              <Box pb={3}>
                <Typography
                  htmlFor="targetCompany"
                  level="h6"
                  textColor={"info.400"}
                >
                  <Twemoji text="💻" />
                  Company:
                </Typography>
                <div className="input-style">
                  <Input
                    id="targetCompany"
                    color="string"
                    value={targetCompany}
                    onChange={handleCompanyChange}
                    placeholder="Enter target company"
                  />
                </div>
              </Box>
            </div>
            <Box pb={3}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography
                  htmlFor="roleRequirement"
                  level="h6"
                  textColor={"info.400"}
                >
                  {" "}
                  <Twemoji text="📝" />
                  Role Requirement:
                </Typography>
              </div>
              <Textarea
                id="roleRequirement"
                maxRows={6}
                color="string"
                value={roleRequirement}
                onChange={handleRoleRequirementsChange}
                placeholder="Type the role requirement here..."
              ></Textarea>
            </Box>
            <Box pb={2}>
              <Typography
                htmlFor="targetRole"
                level="h6"
                textColor={"info.400"}
              >
                <Twemoji text="📜" />
                Message Requirement:
              </Typography>
            </Box>
            <Box pb={3}>
              <Typography htmlFor="recipientName" textColor={"neutral.500"}>
                Recipient's Name:
              </Typography>
              <div className="input-style">
                <Input
                  id="recipientName"
                  color="string"
                  value={recipientName}
                  onChange={handleRecipientNameChange}
                  placeholder="John"
                />
              </div>
            </Box>
            {/* <ThemeProvider theme={customTheme}> */}
            <Grid container alignItems="center" pb={3}>
              <Typography
                textColor={"neutral.500"}
                gutterBottom={true}
                paddingRight={1}
              >
                Write a
              </Typography>
              <Grid item>
                <FormControl size="small" fullWidth>
                  <Select
                    value={messageStyle}
                    onChange={(event) => setMessageStyle(event.target.value)}
                  >
                    <MenuItem value="linkedin">LinkedIn</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Typography
                textColor={"neutral.500"}
                gutterBottom={true}
                padding={1}
              >
                {" "}
                message to a{" "}
              </Typography>
              <Grid item>
                <FormControl
                  sx={{ m: 1, minWidth: 120 }}
                  size="small"
                  color="info"
                >
                  <Select
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}
                  >
                    <MenuItem value="recruiter">recruiter</MenuItem>
                    <MenuItem value="hiring manager">hiring manager</MenuItem>
                    <MenuItem value="product manager">product manager</MenuItem>
                    <MenuItem value="employee">employee</MenuItem>
                    <MenuItem value="CEO/founder">CEO/founder</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Typography
                textColor={"neutral.500"}
                gutterBottom={true}
                padding={1}
              >
                at {targetCompany + " "}
                who is a
              </Typography>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    value={relationship}
                    onChange={(event) => setRelationship(event.target.value)}
                  >
                    <MenuItem value="hiring manager">school alumni</MenuItem>
                    <MenuItem value="product manager">
                      previous colleagues
                    </MenuItem>
                    <MenuItem value="employee">secondary connection</MenuItem>
                    <MenuItem value="employee">stranger </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Typography
                textColor={"neutral.500"}
                gutterBottom={true}
                padding={1}
              >
                to ask for
              </Typography>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    value={ask}
                    onChange={(event) => setAsk(event.target.value)}
                  >
                    <MenuItem value="a quick chat">a chat</MenuItem>
                    <MenuItem value="referral">referral</MenuItem>
                    <MenuItem value="interview prep">interview prep</MenuItem>
                    <MenuItem value="being referred to the Hiring Manager">
                      being referred to the Hiring Manager{" "}
                    </MenuItem>
                    <MenuItem value="are you hiring">
                      avalibale positions{" "}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Typography
                textColor={"neutral.500"}
                gutterBottom={true}
                padding={1}
              >
                in{" "}
              </Typography>
              <Grid item>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select
                    value={wordDetails}
                    onChange={(event) => setWordDetails(event.target.value)}
                  >
                    <MenuItem value="50">50</MenuItem>
                    <MenuItem value="100">100</MenuItem>
                    <MenuItem value="200">150 </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Typography
                textColor={"neutral.500"}
                gutterBottom={true}
                padding={1}
              >
                words
              </Typography>
            </Grid>
            {/* </ThemeProvider> */}
            <Box pb={2}>
              <Typography
                htmlFor="additionalAsk"
                level="h6"
                textColor={"info.400"}
              >
                <Twemoji text="✏️" />
                Additonal Ask:{" "}
              </Typography>
              <Textarea
                id="moreRequest"
                maxRows={2}
                color="string"
                value={moreRequest}
                onChange={(e) => setMoreRequest(e.target.value)}
                placeholder="Highlight my experience in SQL..."
              ></Textarea>
            </Box>
          </Box>
          {isXsScreen && (
            <Box pb={5}>
              {" "}
              <div className="received-message-xs" ref={receivedMessageRef}>
                <Typography classname="received-message-title" level="h5">
                  Received Message
                </Typography>
                {isLoading ? (
                  <ClipLoader color="#a374f9" />
                ) : (
                  <Typography level="body2" className="output-text">
                    {receivedMessage}
                  </Typography>
                )}
                {receivedMessage && receivedMessage.trim().length > 0 && (
                  <Button
                    className="copy-btn"
                    onClick={(event) => copyToClipboard(event)}
                  >
                    Copy
                  </Button>
                )}
              </div>
              <div id="outputText" className="output">
                {outputText}
              </div>
              <div className="fixed-bottom-xs">
                <Button
                  variant="solid"
                  className="generate-button"
                  onClick={() => {
                    handleGenerateClick();
                    scrollToReceivedMessage();
                  }}
                >
                  Write the Message
                </Button>
              </div>
            </Box>
          )}
          <Box pb={20}></Box>
        </Box>
      </Grid>
      {!isXsScreen && (
        <Grid xs={6} md={6} style={{ backgroundColor: "#F4EAFF" }}>
          <Box
            sx={{
              position: "fixed",
              top: "40px",
              bottom: "16px",
              right: "16px",
              width: "45%",
              backgroundColor: "background.paper",
              boxShadow: 1,
              borderRadius: "4px",
              padding: "16px",
              overflowY: "auto",
            }}
          >
            {" "}
            <div className="received-message">
              <Typography classname="received-message-title" level="h5">
                Received Message
              </Typography>
              {isLoading ? (
                <ClipLoader color="#a374f9" />
              ) : (
                <Typography level="body2" className="output-text">
                  {receivedMessage}
                </Typography>
              )}
              {receivedMessage && receivedMessage.trim().length > 0 && (
                <Button
                  className="copy-btn"
                  onClick={(event) => copyToClipboard(event)}
                >
                  Copy
                </Button>
              )}
            </div>
            <div id="outputText" className="output">
              {outputText}
            </div>
            <div className="fixed-bottom">
              <Button
                variant="solid"
                className="generate-button"
                onClick={handleGenerateClick}
              >
                Write the Message
              </Button>
            </div>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}

export default Main;
