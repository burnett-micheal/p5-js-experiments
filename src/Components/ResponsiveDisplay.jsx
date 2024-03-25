import { useEffect, useState } from "react";
import TooBig from "./Displays/TooBig";
import Desktop from "./Displays/Desktop/Desktop";
import Tablet from "./Displays/Tablet/Tablet";
import Phone from "./Displays/Phone/Phone";
import TooSmall from "./Displays/TooSmall";

function ResponsiveDisplay() {
  const displays = [
    { minWidth: 9999, maxWidth: Infinity, component: <TooBig /> },
    { minWidth: 1280, maxWidth: 9999, component: <Desktop /> },
    { minWidth: 700, maxWidth: 1280, component: <Tablet /> },
    { minWidth: 320, maxWidth: 700, component: <Phone /> },
    { minWidth: -Infinity, maxWidth: 320, component: <TooSmall /> }
  ];

  const getDisplayIndex = () => {
    let result = null
    for (let i = 0; i < displays.length; i++) {
      if (displays[i].minWidth <= window.innerWidth && displays[i].maxWidth >= window.innerWidth) {
        result = i;
        break;
      }
    }
    return result;
  }

  const [displayIndex, setDisplayIndex] = useState(getDisplayIndex());

  const updateMedia = () => {
    const newDisplayIndex = getDisplayIndex();
    if (newDisplayIndex !== displayIndex)
      setDisplayIndex(newDisplayIndex);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      {displays[displayIndex].component}
    </div>
  );
}

export default ResponsiveDisplay;