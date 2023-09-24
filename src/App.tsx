import { useState } from 'react';
import ConfigIteration from './components/ConfigIteration';
import LectureMaterials from './components/LectureMaterials';
import './App.css';
import AppBar from './components/AppBar';
import { SnackbarProvider } from 'notistack';
import EvalquizTour from './components/EvalquizTour';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Lecture Materials');
  const [advancedMode, setAdvancedMode] = useState(false);

  const handleCurrentPage = (item: string) => {
    setCurrentPage(item);
  };

  const [tour, setTour] = useState(true);

  const handleSetTour = (value: boolean) => {
    if (value === true) {
      setAdvancedMode(false);
      setCurrentPage('Lecture Materials');
    }
    setTour(value);
  };

  const handleToggleAdvancedMode = (value: boolean) => {
    setAdvancedMode(value);
  };

  return (
    <SnackbarProvider>
      <ErrorBoundary>
        <EvalquizTour tour={tour} onSetTour={handleSetTour} />
      </ErrorBoundary>
      <AppBar
        onPageChange={handleCurrentPage}
        onSetTour={handleSetTour}
        advancedMode={advancedMode}
        onToggleAdvancedMode={handleToggleAdvancedMode}
      />
      {currentPage === 'Lecture Materials' ? <LectureMaterials /> : null}
      {currentPage === 'Config Iteration' ? (
        <ConfigIteration advancedMode={advancedMode} />
      ) : null}
    </SnackbarProvider>
  );
}
