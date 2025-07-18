import { alldataFunc, allDataArr } from './data.js';

document.getElementById("dataGeneratorBtn").addEventListener("click", () => {
  // Clear old data
  allDataArr.length = 0;

  // Fill array with new data
  alldataFunc(); // must push new items into allDataArr

  if (allDataArr.length !== 0) {
    console.log("Sending:", allDataArr);

    fetch('/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(allDataArr)
    });
  } else {
    console.warn("allDataArr is still empty after running alldataFunc()");
  }
});

