
// for mui
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import { Button, Stack } from '@mui/material';
import { makeNnActor } from 'ui/service/actor-locator';

type trainDataType = {
  data: Float64Array[],
}

type trainTargetType = {
  target: Float64Array,
}

type predictDataType = {
  data: Float64Array,
}

function footer() {

  function terminalClear(): void {
    const pyTerminalElement = document.querySelector(".py-terminal") as HTMLDivElement;
    pyTerminalElement.innerText = "";
  }

  async function executeTrain() {
    const pyTerminalElement = document.querySelector(".py-terminal") as HTMLDivElement;
    const getText = pyTerminalElement?.innerText as string;
    const splitedText = getText.split("\n");
    const methodText = splitedText[0].replace('method = ', '');
    const dataText = splitedText[1].replace('data = ', '');
    const targetText = splitedText[2].replace('target = ', '');
    const trainEpocText = parseInt(splitedText[3].replace('epoc = ', ''));

    console.log("dataText: ", dataText);
    console.log("targetText: ", targetText);

    const trainData: trainDataType = JSON.parse(dataText);
    const trainTarget: trainTargetType = JSON.parse(targetText);

    console.log("trainData: ", trainData);
    console.log("trainTarget: ", trainTarget);
    const actor = makeNnActor();

    let result;
    if (methodText === "train") {
      result = await actor.train(trainData, trainTarget, trainEpocText);
    } else {
      console.error("wrong method")
    }
    console.log("result: ", result);
  }

  async function executePredict() {
    const pyTerminalElement = document.querySelector(".py-terminal") as HTMLDivElement;
    const getText = pyTerminalElement?.innerText as string;
    const splitedText = getText.split("\n");
    const methodText = splitedText[0].replace('method = ', '');
    const dataText = splitedText[1].replace('data = ', '');
    const targetText = splitedText[2].replace('target = ', '');

    console.log("dataText: ", dataText);
    console.log("targetText: ", targetText);

    const predictData: Array<number> = JSON.parse(dataText);

    console.log("predictData: ", predictData);
    const actor = makeNnActor();

    let result;
    if (methodText === "predict") {
      result = await actor.predict(predictData);
    } else {
      console.error("wrong method")
    }
    console.log("result: ", result);
  }

  async function executePredictAll() {
    const pyTerminalElement = document.querySelector(".py-terminal") as HTMLDivElement;
    const getText = pyTerminalElement?.innerText as string;
    const splitedText = getText.split("\n");
    const methodText = splitedText[0].replace('method = ', '');
    const dataText = splitedText[1].replace('data = ', '');
    const targetText = splitedText[2].replace('target = ', '');

    console.log("dataText: ", dataText);
    console.log("targetText: ", targetText);

    const predictData: Array<Array<number>> = JSON.parse(dataText);

    console.log("predictData: ", predictData);
    const actor = makeNnActor();

    let result;
    if (methodText === "predict") {
      let resultPredict: Array<number> = [];
      for (let i = 0; i < predictData.length; i++) {
        result = await actor.predict(predictData[i]);
        resultPredict.push(result.Ok[0]);
      }
      console.log("resultPredict: ", resultPredict);
      console.log("targetText: ", JSON.parse(targetText));
    } else {
      console.error("wrong method")
    }
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={4}>
      <BottomNavigation showLabels sx={{ height: '100%' }}>
        <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Button
            sx={{ textTransform: 'none', }}
            variant="contained"
            onClick={terminalClear}
          >
            Clear Terminal
          </Button>
          <Button
            sx={{ textTransform: 'none', }}
            variant="contained"
          // onClick={executeTrain}
          >
            Single Training
          </Button>
          <Button
            sx={{ textTransform: 'none', }}
            variant="contained"
            onClick={executeTrain}
          >
            Training
          </Button>
          <Button
            sx={{ textTransform: 'none', }}
            variant="contained"
            onClick={executePredict}
          >
            Predict
          </Button>
          <Button
            sx={{ textTransform: 'none', }}
            variant="contained"
            onClick={executePredictAll}
          >
            Predict ALL
          </Button>
        </Stack>
      </BottomNavigation>
    </Paper>
  );
}

export default footer;