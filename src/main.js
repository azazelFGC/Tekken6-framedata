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
  if (characterData == "Erro" || !characterData.frames) {
    const target = document.querySelector("#main-container");
    target.innerHTML = "";
    document.querySelector("#CharName").innerText = "Erro";
    const errorContent = document.createElement("h1");
    errorContent.innerText = "Erro: Framedata não encontrada ou indisponível";
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
  const createTr = (mainBody, input) => {
    const tr = document.createElement("tr");
    ["input", "range", "DMG", "speed", "block", "hit", "ch"].forEach((data) => {
      const td = document.createElement("td");
      td.innerText = input[data] === undefined ? "?" : input[data];
      td.className = "p-2 border-y-zinc-800 border-x-zinc-900 border-1";
      tr.append(td);
      tr.onclick = () => {
        tr.classList.toggle("bg-gradient-to-r");
        tr.classList.toggle("text-blue-200/80");
      };
    });

    tr.className =
      "cursor-pointer text-nowrap   hover:bg-gradient-to-r from-slate-900/70 to-gray-900/70";
    mainBody.append(tr);
  };
  const target = document.querySelector("#main-container");
  target.innerHTML = ``;
  console.log("here" + characterData);

  const renderTableUnique = (characterData) => {
    const div = document.createElement("div");

    div.className = "max-h-full gap-2 w-full";
    div.innerHTML = ` 
               <h1 class="h-min  text-gray-100 "></h1>
              <div id="table-unique-container"}
                class="max-w-full h-95/100 max-h-d130 sm:max-h-200 bg-black/70 bg-gradijent-to-r from-gray-950/40 from-20% to-black/40 "
              >
               
                <div class="h-full overflow-x-auto max-w-full ">
                  <table
                    class="table-auto sm:w-200"
                  >
                    <thead class="text-gray-300  border-x-zinc-900 border-x-1">
                      <tr class="">
                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>INPUT</p>
                          </div>
                        </th>
                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>RANGE</p>
                          </div>
                        </th>
                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>DMG</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>SPEED</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>BLOCK</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0  ">
                          <div class="flex w-full ">
                            <p>HIT</p>
                          </div>
                        </th>

                        <th class="p-2 sticky top-0">
                          <div class="flex w-full ">
                            <p>CH</p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody id=${"table-unique"} class="text-blue-300/55" > </tbody>
                  </table>
                </div></div>`;
    target.append(div);
    const mainBody = document.querySelector("#table-unique");
    mainBody.innerHTML = "";
    characterData.frames.forEach((action) => {
      const trAction = document.createElement("tr");
      trAction.className = `
       text-nowrap border-x-zinc-900 border-x-1`;

      const tdAction = document.createElement("td");
      tdAction.innerText = action.action;
      tdAction.className = "p-2 text-blue-400/80 text-lg";
      trAction.append(tdAction);

      mainBody.append(trAction);
      action.data.forEach((input) => {
        createTr(mainBody, input);
      });
    });
  };
  renderTableUnique(characterData);
};
const toggleCurrentAStyle = (currentA) => {
  currentA.classList.toggle("sm:bg-black/65");
  currentA.classList.toggle("text-blue-500");
  currentA.classList.toggle("sm:border-t-gray-400");
  currentA.classList.toggle("sm:border-b-gray-600");
  currentA.classList.toggle("sm:border-x-gray-600");
  currentA.classList.toggle("sm:border-l-transparent");
};
window.addEventListener("hashchange", async () => {
  try {
    const pastA = document.querySelector(`a.sm\\:bg-black\\/65`);
    toggleCurrentAStyle(pastA);
  } catch (err) {}
  try {
    const currentA = document.querySelector(
      `nav a[href="${window.location.hash}"]`,
    );
    if (currentA) {
      toggleCurrentAStyle(currentA);
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
        "border-2 rounded-r-xl border-transparent px-2 text-nowrap flex items-center sm:w-full hover:bg-black/65 sm:p-4 ";
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
        toggleCurrentAStyle(currentA);
      }
      const character = window.location.hash.substring(1);

      renderFrameData(await getData(character));
    }
  } catch (e) {
    console.log(e);
  }
});
