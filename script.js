document.getElementById("inputURL").addEventListener("input", function() {
  const inputValue = this.value;
  const outputField = document.getElementById("outputURL");

  if (isValidURL(inputValue)) {
    const modifiedURL = modifyURL(inputValue);
    outputField.value = modifiedURL;
    outputField.classList.remove("error");

    if (document.getElementById("autoCopy").checked) {
      copyToClipboard(modifiedURL);
    }

    // Add success class and remove it after the animation duration
    outputField.classList.add("success");
    setTimeout(() => {
      outputField.classList.remove("success");
    }, 800);  // Match this delay with the CSS animation duration
  } else {
    outputField.value = "Incorrect URL...";
    // Add error class and remove it after the animation duration
    outputField.classList.add("error");
    setTimeout(() => {
      outputField.classList.remove("error");
    }, 800);  // Match this delay with the CSS animation duration
  }
});


const inputs = document.querySelectorAll("input[type='text']");

inputs.forEach(input => {
  input.addEventListener("focus", function() {
    this.select();
  });
  // Add an event listener for paste event
  input.addEventListener("paste", function() {
    setTimeout(() => this.select(), 0);
  });
});

inputs[1].addEventListener("keydown", function(e) {
  if (e.key === "Tab") {
    e.preventDefault();
    inputs[0].focus();
  }
});

// Add an event listener for the first input to focus it on page load
document.addEventListener("DOMContentLoaded", function() {
  inputs[0].focus();
});

function isValidURL(url) {
  const pattern = /^https:\/\/assets\.laliga\.com\/squad\/\d+\/t\d+\/(p|man)\d+\/\d+x\d+\/(p|man)\d+_t\d+_\d+_\d+_\d+_\d+\.png$/
  return pattern.test(url);
}

function modifyURL(url) {
  let modifiedURL = url.replace(/\/\d+x\d+\//, "/2048x2048/");
  return modifiedURL.replace(/_(\d+)_(\d+)_\d+_(\d+)\.png$/, "_$1_$2_003_$3.png");
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

document.getElementById("openImage").addEventListener("click", function() {
  const outputUrl = document.getElementById("outputURL").value;
  if (outputUrl && isValidURL(outputUrl)) {
    window.open(outputUrl, '_blank');
  }
});