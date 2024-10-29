function updateRateLabel(value) {
  document.getElementById("rateValue").textContent = value;
}

let urlAudio = "";

document
  .getElementById("speakButton")
  .addEventListener("click", async function () {
    const rateValue = document.getElementById("rateValue");
    const text = document.getElementById("text").value;
    const selectElement = document.getElementById("country-select");

    const audioContainer = document.getElementById("audioContainer");

    try {
      const res = await axios.get(
        `https://api.voicerss.org/?key=dc34e6febedf4aab9d6e7c194c272302&hl=${selectElement.value}&src=${text}&r=${rateValue.value}`
      );

      urlAudio = res.config.url;

      const audioPlayer = document.getElementById("audioPlayer");
      audioPlayer.src = urlAudio;
      audioPlayer.play();
      audioContainer.classList.toggle("active");
    } catch (error) {
      alert("lỗi rồi");
      console.log(error);
    }
  });

document
  .getElementById("download-button")
  .addEventListener("click", async function () {
    window.open(urlAudio);
  });
