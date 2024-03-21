'use strict'

const texto = document.querySelector("#texto");
const traducao = document.querySelector("#traducao");
const botao = document.querySelector("#botao");
const selects = document.querySelectorAll("select");


const countries = {
    "en-GB": "Inglês",
    "pt-BR": "Português",
};


selects.forEach((select) => {
    for (let country in countries) {
        let selected;
        if (select.className.includes("selectFrom") && country == "pt-BR") {
            selected = "selected";
        } else if (select.className.includes("selectTo") && country == "en-GB") {
            selected = "selected";
        }

        const option = `<option value="${country}" ${selected}>${countries[country]}</option>`;

        select.insertAdjacentHTML("beforeend", option);
    }
});

botao.addEventListener("click", () => {
    if (texto.value) {
        traducaoAPI();
    } else {
        traducao.value = "";
    }
});

function traducaoAPI() {
    fetch(
        `https://api.mymemory.translated.net/get?q=${texto.value}&langpair=${selects[0].value}|${selects[1].value}`
    )
        .then((res) => res.json())
        .then((data) => {
            traducao.value = data.responseData.translatedText;
        });
}