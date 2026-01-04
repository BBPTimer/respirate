import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import { useContext } from "react";
import { useNavigate } from "react-router";
import sampleData from "../assets/respirateBackup.json";
import { AppContext } from "../contexts/AppContext";
import ConfirmDialog from "./ui/ConfirmDialog";

const About = () => {
  const {
    parseDataString,
    storePets,
    setIsConfirmOpen,
    setConfirmMessage,
    setConfirmCallback,
    cleanUpConfirm,
  } = useContext(AppContext);

  let navigate = useNavigate();

  const loadSampleData = () => {
    localStorage.setItem("pets", JSON.stringify(sampleData));
    storePets(parseDataString(localStorage.getItem("pets")));

    // Navigate to graphs
    navigate("/graphs");

    cleanUpConfirm();
  };

  const handleSampleDataClick = () => {
    setIsConfirmOpen(true);
    setConfirmMessage(
      "If you have existing pet data, this will overwrite it with sample data. Proceed?"
    );
    setConfirmCallback(() => loadSampleData);
  };

  return (
    <div id="about">
      <h1>About</h1>
      <p>
        Welcome to RespiRate! RespiRate is a full-featured breathing rate
        monitor for pets experiencing cardiac abnormalities.{" "}
      </p>
      <Divider />
      <h2>Web App</h2>
      <p>
        RespiRate works best when installed as a web app!
        <br />
        <Link
          href="https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios"
          target="_blank"
          rel="noreferrer"
          underline="none"
        >
          iOS instructions
        </Link>
        <br />
        <Link
          href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DAndroid"
          target="_blank"
          rel="noreferrer"
          underline="none"
        >
          Android instructions
        </Link>
      </p>
      <Divider />
      <h2>Features</h2>
      <ul>
        <li>Supports multiple pets</li>
        <li>Change target breathing rate for each pet</li>
        <li>Custom timer duration</li>
        <li>Optional comment for each breathing rate</li>
        <li>Color-coded data table with sorting, filtering, and search</li>
        <li>Download data as CSV or PDF</li>
        <li>Add breathing rates manually</li>
        <li>Delete breathing rates</li>
        <li>Download JSON copy of data for backup or to email to vet</li>
        <li>Restore JSON copy of data</li>
        <li>Color-coded graphs</li>
        <li>Custom date range for graphs</li>
        <li>Average breathing rate during custom date range</li>
        <li>Web-based for access on any device</li>
        <li>On-device data storage</li>
        <li>Backup reminders every 30 days</li>
      </ul>
      <br />
      <br />
      <Divider />
      <h2>Data Storage</h2>
      <p className="justified">
        Your pet data is stored in your browser's local storage. That means that
        you, and you alone, own your data! However, that also makes you
        responsible for your data. Please keep mind that if you clear your
        browser's cache, you will also clear your browser's local storage.
        <br />
        <br />
        Don't fret! The{" "}
        <span
          onClick={() => navigate("/data")}
          style={{ color: "#f44336", cursor: "pointer" }}
        >
          Data
        </span>{" "}
        page has buttons to back up your data, and to restore it if you ever
        need! Additionally, 30 days after your most recent backup, RespiRate
        will show you a dialog that reminds you to back up your data, with a
        button to back up.
        <br />
        <br />
        You can also email your veterinarian a copy of your data backup so that
        they may view your pet's data on their device!
      </p>
      <Divider />
      <h2>About Us</h2>
      <AvatarGroup sx={{ justifyContent: "center", display: "flex" }}>
        <Avatar
          src="/avatars/Greg.png"
          alt="Greg"
          sx={{ width: 56, height: 56 }}
        />
        <Avatar
          src="/avatars/Buster.png"
          alt="Buster"
          sx={{ width: 56, height: 56 }}
        />
        <Avatar
          src="/avatars/Dean.png"
          alt="Dean"
          sx={{ width: 56, height: 56 }}
        />
        <Avatar
          src="/avatars/Ted.png"
          alt="Ted"
          sx={{ width: 56, height: 56 }}
        />
      </AvatarGroup>
      <p className="justified">
        My name is Greg Weseloh, and I had a dog, Buster, who had congestive
        heart failure. Now I have a dog, Dean, with mitral valve disease. Our
        veterinary cardiologist recommended tracking their breathing rate to
        monitor disease progression and help inform treatment. I found other
        apps buggy and limited in features, so I decided to build a better
        option! I hope that RespiRate provides you a comforting experience
        during a difficult time in your pet's journey.
      </p>
      <Divider />
      <h2>For Vets</h2>
      <Link href="/flyer.png" target="_blank" underline="none">
        Flyer with QR code
      </Link>
      <br />
      <Typography
        onClick={handleSampleDataClick}
        color="red"
        style={{ cursor: "pointer" }}
      >
        Load sample data
      </Typography>
      <ConfirmDialog />
      <br />
      <Divider />
      <h2>
        <Link href="mailto:greg@respirate.app" underline="none">
          Issues or feature requests?
        </Link>
      </h2>
      <footer>&copy; {new Date().getFullYear()} Greg Weseloh LLC</footer>
    </div>
  );
};

export default About;
