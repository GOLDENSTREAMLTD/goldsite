async function loadLanguage(lang) {
  const res = await fetch("lang/lang.json");
  const data = await res.json();
  const content = data[lang];

  document.querySelector("header h1").innerText = content.title;
  document.querySelector(".price-box h2").innerText = content.price_title;
  document.querySelector(".currency-box h3").innerText = content.conversion;
  document.querySelector(".contact-box h3").innerText = content.contact_us;
  document.querySelector("#contact-form input[type='text']").placeholder = content.name_placeholder;
  document.querySelector("#contact-form input[type='email']").placeholder = content.email_placeholder;
  document.querySelector("#contact-form textarea").placeholder = content.message_placeholder;
  document.querySelector("#contact-form button").innerText = content.submit;
  document.querySelector(".contact-icons p").innerText = content.wechat_contact;
  document.querySelector(".contact-icons a").innerText = content.whatsapp_contact;
}

document.addEventListener("DOMContentLoaded", () => {
  const langToggle = document.createElement("div");
  langToggle.innerHTML = '<button onclick="loadLanguage(\'en\')">🇬🇧</button> <button onclick="loadLanguage(\'zh\')">🇨🇳</button>';
  langToggle.style.position = "absolute";
  langToggle.style.top = "10px";
  langToggle.style.right = "10px";
  document.body.appendChild(langToggle);
  loadLanguage("en");
});
