import React, { useEffect } from "react";

import { Box } from "../compNdx";
import DropboxChooser from "react-dropbox-chooser";
import ReactJson from "react-json-view";
import { useSetState } from "react-use";

export const Dropbox = props => {
  const [files, setFiles] = useSetState([{ thumbnailLink: "https://boo.com" }]);
  useEffect(() => {
    console.log(files);
  }, [files]);
  return (
    <Box sx={{ bg: "primary", width: "100vw", height: "200px" }}>
      <DropboxChooser
        appKey={"0mumf2wcb3x7q55"}
        success={files => setFiles(files)}
        cancel={() => this.onCancel()}
        multiselect={true}
        extensions={[".jpg", ".pdf", ".csv", ".png", ".mp4"]}
      >
        <Box className="dropbox-button">Click me!</Box>
      </DropboxChooser>
    </Box>
  );
};
