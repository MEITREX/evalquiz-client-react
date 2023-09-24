import Tour from 'reactour';
import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

interface Props {
  tour: boolean;
  onSetTour: (item: boolean) => void;
}

export default function EvalquizTour({ tour, onSetTour }: Props) {
  const closeTour = () => {
    onSetTour(false);
  };

  const steps = [
    {
      content: () => (
        <Fragment>
          <Stack direction='row'>
            Welcome to:
            <Typography
              sx={{
                mr: 2,
                ml: 1,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              EVALQUIZ
            </Typography>
          </Stack>
          <br /> A system for generating self-assessement from lecture
          materials.
          <hr />
          This tour will guide you step-by-step through the interface.
        </Fragment>
      ),
    },
    {
      selector: '[id="upload-file-button"]',
      content: 'Upload a lecture material!',
    },
    {
      selector: '[id="Config Iteration"]',
      content: 'Go to "Config Iteration" to configure question generation.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector: '[aria-label="Add to Batches"]',
      content: () => (
        <Fragment>
          Add a new batch: <br />
          <br />A batch is a isolated set of question generation settings.
        </Fragment>
      ),
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '.MuiButtonBase-root.MuiListItem-root.MuiListItem-gutters.MuiListItem-padding.MuiListItem-button.MuiListItem-secondaryAction',
      content: 'View batch.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '.MuiButtonBase-root.MuiTab-root.MuiTab-textColorInherit.Mui-selected',
      content: 'Edit Capabilites to influence question generation in batch.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector: '[aria-label="Add to Capabilites"]',
      content: () => (
        <Fragment>
          Add a new Capability: <br />
          <br /> Questions that quiz the Capabilities are generated later on.
        </Fragment>
      ),
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '.MuiButtonBase-root.MuiAccordionSummary-root.MuiAccordionSummary-gutters',
      content: 'View Capability.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector: '[id="#/properties/educational_objective"]',
      content: () => (
        <Fragment>
          Choose Educational Objective: <br />
          <br /> Describes educational goal of Capability. Goal is reached, if a
          student has acquired the Capability.
        </Fragment>
      ),
    },
    {
      selector: '[aria-label="Add to Keywords button"]',
      content: () => (
        <Fragment>
          Add a keyword: <br />
          <br /> Keywords describe the context/scope of Educational Objectives.
        </Fragment>
      ),
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector: 'tr.MuiTableRow-root.MuiTableRow-hover',
      content: () => (
        <Fragment>
          Type keyword: <br />
          <br /> A specific keyword from one of the lecture materials we want to
          use for question generation.
        </Fragment>
      ),
      action: (element: {
        children: { children: { children: any[] }[] }[];
      }) => {
        element.children[0].children[0].children[0].value = 'photosynthesis';
      },
    },
    {
      selector: '[id="#/properties/relationship"]',
      content: () => (
        <Fragment>
          Select relationship of keywords: <br />
          <br /> Describes which keyword relationship aspect we want to
          highlight. For example: "The differences between keyword A and keyword
          B." <br />
          <br /> "COMPLEX" can be chosen, if none of the other relationships are
          suitable.
        </Fragment>
      ),
    },
    {
      selector: '.MuiTabs-scroller.MuiTabs-hideScrollbar.MuiTabs-scrollableX',
      content: 'Go to lecture materials.',
      action: (element: { children: { children: any[] }[] }) => {
        let child = element.children[0].children[1];
        child.click();
      },
    },
    {
      selector: '[aria-label="Add to Lecture Materials"]',
      content: 'Add a new lecture material.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '.MuiButtonBase-root.MuiAccordionSummary-root.MuiAccordionSummary-gutters',
      content: 'View lecture material.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector: '.MuiAccordionDetails-root',
      content: () => (
        <Fragment>
          Select lecture material: <br />
          <br /> Here we can choose one of the lecture materials we have
          uploaded earlier.
        </Fragment>
      ),
    },
    {
      selector: '.MuiTabs-scroller.MuiTabs-hideScrollbar.MuiTabs-scrollableX',
      content: 'Go to question to generate',
      action: (element: { children: { children: any[] }[] }) => {
        let child = element.children[0].children[2];
        child.click();
      },
    },
    {
      selector: '[aria-label="Add to Question To Generate"]',
      content: 'Add a new question to generate.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '.MuiButtonBase-root.MuiAccordionSummary-root.MuiAccordionSummary-gutters',
      content: 'View question to generate.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector: '[id="#/properties/question_type"]',
      content: () => (
        <Fragment>
          Select question type: <br />
          <br /> The type of question we want to generate.
        </Fragment>
      ),
    },
    {
      selector:
        '[aria-label="Sends config to server in order to generate questions"]',
      content: 'Generate questions as configured.',
    },
    {
      selector:
        '[aria-label="Sends config to server in order to generate questions"]',
      content: 'Generate questions as configured.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector: '.MuiTabs-scroller.MuiTabs-hideScrollbar.MuiTabs-scrollableX',
      content:
        'Generation results can be found for each batch under "Question To Generate".',
    },
    {
      selector: '.MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary',
      content: 'As well as in the raw JSON data.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector: '[id=raw-json-data]',
      content: "Let's take a look at our config in JSON.",
    },
    {
      selector: '[id=download-config-button]',
      content: 'We can download our config as `config.json`',
    },
    {
      selector: '[id=clear-config-button]',
      content: 'Clear our config.',
    },
    {
      selector: '[id=upload-config-button]',
      content: 'And upload a saved as `config.js` at a later time.',
    },
    {
      content: 'And upload a saved as `config.js` at a later time.',
      action: closeTour,
    },
  ];

  return (
    <Tour
      isOpen={tour}
      steps={steps}
      onRequestClose={closeTour}
      prevStep={() => {}}
      prevButton=' '
      disableDotsNavigation={true}
      disableKeyboardNavigation={['left']}
      closeWithMask={true}
      startAt={0}
      className='helper'
      rounded={5}
      maskClassName='mask'
    />
  );
}
