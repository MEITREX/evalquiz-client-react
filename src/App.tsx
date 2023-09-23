import { useState } from 'react';
import ConfigIteration from './components/ConfigIteration';
import LectureMaterials from './components/LectureMaterials';
import './App.css';
import AppBar from './components/AppBar';
import { SnackbarProvider } from 'notistack';
import EvalquizTour from './components/EvalquizTour';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Lecture Materials');
  const [advancedMode, setAdvancedMode] = useState(false);

  const handleCurrentPage = (item: string) => {
    setCurrentPage(item);
  };

  const [tour, setTour] = useState(false);

  const handleSetTour = (value: boolean) => {
    setCurrentPage('Lecture Materials');
    setTour(value);
  };

  const handleToggleAdvancedMode = (value: boolean) => {
    setAdvancedMode(value);
  };

  return (
    <SnackbarProvider>
      <EvalquizTour tour={tour} onSetTour={handleSetTour} />
      <AppBar
        onPageChange={handleCurrentPage}
        onSetTour={handleSetTour}
        onToggleAdvancedMode={handleToggleAdvancedMode}
      />
      {currentPage === 'Lecture Materials' ? <LectureMaterials /> : null}
      {currentPage === 'Config Iteration' ? (
        <ConfigIteration advancedMode={advancedMode} />
      ) : null}
    </SnackbarProvider>
  );
}
