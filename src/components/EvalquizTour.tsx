import Tour from 'reactour';
import { Fragment } from 'react';

interface Props {
  tour: boolean;
  onSetTour: (item: boolean) => void;
}

export default function EvalquizTour({ tour, onSetTour }: Props) {
  const closeTour = () => {
    onSetTour(false);
  };

  const tryElementClick = (element: { click: () => void }) => {
    try {
      element.click();
    } catch (e) {
      console.error(e);
    }
  };

  const steps = [
    {
      selector: '[id="uploadFileButton"]',
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
          <br />
          Capabilities and lecture materials influence the questions generated
          in the respective batch.
        </Fragment>
      ),
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '[class="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-padding MuiListItem-button MuiListItem-secondaryAction css-15ofzo3-MuiButtonBase-root-MuiListItem-root"]',
      content: 'View batch.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '[class="MuiButtonBase-root MuiTab-root MuiTab-textColorInherit Mui-selected css-cjctlb-MuiButtonBase-root-MuiTab-root"]',
      content: 'Edit Capabilites to influence question generation outcome.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector: '[aria-label="Add to Capabilites"]',
      content: () => (
        <Fragment>
          Add a new Capability: <br />
          <br /> Capabilities should enable a student to answer the question(s)
          we are about to generate.
        </Fragment>
      ),
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '[class="MuiButtonBase-root MuiAccordionSummary-root MuiAccordionSummary-gutters css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root"]',
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
          <br /> Describes what a student should be able to do with the
          specified keywords.
        </Fragment>
      ),
    },
    {
      selector: '[aria-label="Add to Keywords button"]',
      content: 'Add keyword.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '[class="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedEnd css-1x51dt5-MuiInputBase-input-MuiInput-input"]',
      content: () => (
        <Fragment>
          Type keyword: <br />
          <br /> A specific keyword from one of the lecture materials we want to
          use for question generation.
        </Fragment>
      ),
      action: (element: { value: string }) => {
        element.value = 'my_new_keyword';
      },
    },
    {
      selector: '[id="#/properties/relationship"]',
      content: () => (
        <Fragment>
          Select relationship of keywords: <br />
          <br /> Describes how the Educational Objective can be applied, for
          examples: "Know and understand the differences between keyword A and
          keyword B."
        </Fragment>
      ),
    },
    {
      selector:
        '[class="MuiTabs-flexContainer css-heg063-MuiTabs-flexContainer"]',
      content: 'Go to lecture materials.',
      action: (element: { children: { click: () => void }[] }) => {
        let child = element.children[1];
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
        '[class="MuiButtonBase-root MuiAccordionSummary-root MuiAccordionSummary-gutters css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root"]',
      content: 'View lecture material.',
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '[class="MuiAccordionDetails-root css-15v22id-MuiAccordionDetails-root"]',
      content: () => (
        <Fragment>
          Select lecture material: <br />
          <br /> Here we can choose the lecture material we have uploaded
          earlier.
        </Fragment>
      ),
    },
    {
      selector:
        '[class="MuiTabs-flexContainer css-heg063-MuiTabs-flexContainer"]',
      content: 'Go to question to generate',
      action: (element: { children: { click: () => void }[] }) => {
        let child = element.children[2];
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
        '[class="MuiButtonBase-root MuiAccordionSummary-root MuiAccordionSummary-gutters css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root"]',
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
      action: (element: { click: () => void }) => {
        element.click();
      },
    },
    {
      selector:
        '[aria-label="Sends config to server in order to generate questions"]',
      content: 'Generate questions as configured.',
      action: (element: { click: () => void }) => {
        element.click();
        closeTour();
      },
    },
  ];

  return (
    <Tour
      isOpen={tour}
      steps={steps}
      onRequestClose={closeTour}
      prevStep={() => {}}
      disableDotsNavigation={true}
      disableKeyboardNavigation={['left']}
      closeWithMask={false}
      startAt={0}
      className='helper'
      rounded={5}
      maskClassName='mask'
    />
  );
}
