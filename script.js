const apiKey = 'goldapi-4dosmdaz04lo-io';
const goldEndpoint = 'https://www.goldapi.io/api/XAU/USD';
const fxEndpoint = 'https://v6.exchangerate-api.com/v6/8de6c618b25e6db8eb80363d/latest/USD';
let goldUSD = 0;

async function fetchGoldPrice() {
  try {
    const response = await fetch(goldEndpoint, {
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const pricePerKg = (data.price * 32.1507).toFixed(2);
    goldUSD = pricePerKg;
    document.getElementById('gold-price').innerText = `$${pricePerKg} / kg`;
    updateConvertedPrice();
    updateChart(pricePerKg);
  } catch (error) {
    document.getElementById('gold-price').innerText = "加载失败";
  }
}

function updateChart(price) {
  Highcharts.chart('chart-container', {
    title: { text: '实时金价（USD/kg）' },
    series: [{ name: '金价', data: [parseFloat(price)] }]
  });
}

async function updateConvertedPrice() {
  try {
    const fxRes = await fetch(fxEndpoint);
    const fxData = await fxRes.json();
    const currency = document.getElementById('currency-selector').value;
    const rate = fxData.conversion_rates[currency];
    const converted = (goldUSD * rate).toFixed(2);
    document.getElementById('converted-price').innerText = `${currency} ${converted} / kg`;
  } catch (error) {
    document.getElementById('converted-price').innerText = "汇率加载失败";
  }
}

document.getElementById('currency-selector').addEventListener('change', updateConvertedPrice);
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("信息已提交，我们会尽快联系您！");
});

fetchGoldPrice();
setInterval(fetchGoldPrice, 30000);
