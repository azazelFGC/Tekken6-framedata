import "./style.css";
import javascriptLogo from "./assets/javascript.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { setupCounter } from "./counter.js";
// import framedatas from "./data/framedata.json";
const mainNav = document.querySelector("#main-nav");

const slugify = (text) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
const getIndexes = async () => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/index.json`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Erro ao carregar o JSON da lista de personagens: " + error);
    return "Erro";
  }
};

const getData = async (character) => {
  try {
    const response = await fetch(
      `${import.meta.env.BASE_URL}data/${character}.json`,
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Erro ao carregar o JSON: " + error);
    return "Erro";
  }
};

const renderFrameData = (characterData) => {
  if (characterData == "Erro") {
    const target = document.querySelector("#main-container");
    target.innerHTML = "";
    document.querySelector("#CharName").innerText = "Erro";
    const errorContent = document.createElement("h1");
    errorContent.innerText = "Erro: Frame data não encontrada ou indisponível";
    errorContent.style.width = "100%";
    errorContent.style.color = "red";
    target.append(errorContent);
    return;
  }

  try {
    document.querySelector("#CharName").innerText = characterData.name;
  } catch (e) {
    console.log(e);
  }

  const target = document.querySelector("#main-container");
  target.innerHTML = ``;
  console.log("here" + characterData);
  characterData.frames.forEach((action) => {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerText = "TESTE";

    div.className = "max-h-full flex flex-col gap-2 h-fjull  w-full";

    div.innerHTML = ` 
              <h1 class="h-min  text-gray-100 ">${action.action} </h1>
              <div id=${slugify(action.action)}
                class="max-w-full h-95/100 max-h-d130 sm:max-h-200 bg-gray-950/90 flejx bg-gradient-to-r from-gray-950/80 from-20% to-black/50 "
              >
               
                <div class="h-full   overflow-x-auto bg-gradient-to-r from-gray-950 from-20% to-pink-900/0    max-w-full ">
                  <table
                    class=" table-auto sm:w-200 bordder-y-1 border-t-pink-950 border-b-pink-950"
                  >
                    <thead class="text-gray-300      bordjer-x-pink-800 bordder-r-1">
                      <tr class="">
                        <th class="p-2 sticky top-0  p-2 border-x-pink-950/70 border-x-1">
                          <div class="flex w-full">
                            <p>INPUT</p>
                          </div>
                        </th>
                        <th class="p-2 sticky top-0 p-2 border-x-pink-950/70 border-x-1">
                          <div class="flex w-full">
                            <p>RANGE</p>
                          </div>
                        </th>
                        <th class="p-2 sticky top-0 p-2 border-x-pink-950/70 border-x-1">
                          <div class="flex w-full">
                            <p>DMG</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0 p-2 border-x-pink-950/70 border-x-1">
                          <div class="flex w-full">
                            <p>SPEED</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0 p-2 border-x-pink-950/70 border-x-1">
                          <div class="flex w-full">
                            <p>BLOCK</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0 p-2 border-x-pink-950/70 border-x-1">
                          <div class="flex w-full">
                            <p>HIT</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0 p-2 border-x-pink-950/70 border-x-1">
                          <div class="flex w-full">
                            <p>CH</p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody id=${"main-body-" + slugify(action.action)} class="text-gray-500" > </tbody>
                  </table>
                </div></div>`;

    target.append(div);

    const mainBody = document.querySelector(
      "#main-body-" + slugify(action.action),
    );
    mainBody.innerHTML = "";
    action.data.forEach((input) => {
      const renderMainTr = () => {
        const tr = document.createElement("tr");
        ["input", "range", "DMG", "speed", "block", "hit", "ch"].forEach(
          (data) => {
            const td = document.createElement("td");
            td.innerText = input[data];
            td.className = "p-2 border-x-pink-950/70 border-x-1";
            tr.append(td);
            tr.onclick = () => {
              // const search = new Array(
              //   document.getElementsByClassName("bg-gradient-to-r"),
              // );
              // search.forEach((e) => {
              //   if (e.classList.contains("bg-gradient-to-r")) {
              //     e.classList.toggle("bg-gradient-tos-r");
              //   }
              // });
              tr.classList.toggle("bg-gradient-to-r");
              tr.classList.toggle("text-white/80");
            };
          },
        );

        tr.className =
          "border-t-1 cursor-pointer text-nowrap border-t-pink-950/45 hover:border-l-pink-950/20 border-x-pink-900/50 border-r-1 hover:bg-gradient-to-r from-pink-950/90 to-pink-950/70";
        mainBody.append(tr);
      };
      // renderMobileTr();
      renderMainTr();
    });
  });
};
const addCurrentAStyle = (currentA) => {
  currentA.classList.add("sm:bg-gradient-to-l");
  currentA.classList.add("text-white");
  currentA.classList.add("font-black");
  currentA.classList.add("text-lg");
};
window.addEventListener("hashchange", async () => {
  console.log("TESTEt");
  try {
    const pastA = document.querySelector(`a.sm\\:bg-gradient-to-l`);

    pastA.classList.toggle("text-lg");
    pastA.classList.toggle("text-white");
    pastA.classList.toggle("font-black");
    pastA.classList.toggle("sm:bg-gradient-to-l");
  } catch (err) {}
  try {
    const currentA = document.querySelector(
      `nav a[href="${window.location.hash}"]`,
    );
    if (currentA) {
      addCurrentAStyle(currentA);
    }

    const character = window.location.hash.substring(1);
    renderFrameData(await getData(character));
  } catch (error) {
    alert(error);
  }
});
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const indexes = await getIndexes();
    indexes.chars.forEach((value) => {
      const a = document.createElement("a");
      a.className =
        " px-2 text-nowrap flex items-center  sm:w-full hover:bg-pink-600/20 border-b-pink-700  sm:p-4 from-pink-900/30 to-pink-900/70";
      const aText = document.createElement("p");
      aText.innerText = value;
      aText.className = "";
      a.append(aText);
      a.href = "#" + value;
      mainNav.append(a);
    });
    if (window.location.hash) {
      const currentA = document.querySelector(
        `nav a[href="${window.location.hash}"]`,
      );
      if (currentA) {
        addCurrentAStyle(currentA);
      }
      const character = window.location.hash.substring(1);

      renderFrameData(await getData(character));
    }
  } catch (e) {
    console.log(e);
  }
});
