import { Fragment, useState } from "react";
import ConfigIteration from "./components/ConfigIteration";
import LectureMaterials from "./components/LectureMaterials";
import "./App.css";
import AppBar from "./components/AppBar";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Lecture Materials");
  const [advancedMode, setAdvancedMode] = useState(false);

  const handleCurrentPage = (item: string) => {
    setCurrentPage(item);
  };

  const handleToggleAdvancedMode = (value: boolean) => {
    setAdvancedMode(value);
  };

  return (
    <Fragment>
      <AppBar
        onPageChange={handleCurrentPage}
        onToggleAdvancedMode={handleToggleAdvancedMode}
      />
      {currentPage === "Lecture Materials" ? <LectureMaterials /> : null}
      {currentPage === "Config Iteration" ? (
        <ConfigIteration advancedMode={advancedMode} />
      ) : null}
    </Fragment>
  );
}
