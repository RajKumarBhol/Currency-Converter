document.addEventListener("DOMContentLoaded", () => {

  const currencies = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro (Europe)" },
    { code: "INR", name: "Indian Rupee" },
    { code: "GBP", name: "British Pound" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "ZAR", name: "South African Rand" },
    { code: "THB", name: "Thai Baht" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "KRW", name: "South Korean Won" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "DKK", name: "Danish Krone" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "AED", name: "UAE Dirham" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "PLN", name: "Polish Zloty" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "ILS", name: "Israeli Shekel" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "MAD", name: "Moroccan Dirham" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "VND", name: "Vietnamese Dong" },
    { code: "QAR", name: "Qatari Riyal" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "OMR", name: "Omani Rial" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "TWD", name: "Taiwan Dollar" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "COP", name: "Colombian Peso" },
    { code: "PEN", name: "Peruvian Sol" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "RON", name: "Romanian Leu" },
    { code: "ISK", name: "Icelandic Krona" }
  ];

  const fromSelect = document.getElementById("fromCurrency");
  const toSelect = document.getElementById("toCurrency");

  currencies.forEach(({ code, name }) => {
    const option = new Option(`${name} (${code})`, code);
    fromSelect.add(option.cloneNode(true));
    toSelect.add(option.cloneNode(true));
  });

  fromSelect.value = "USD";
  toSelect.value = "INR";

  const toggle = document.getElementById("themeToggle");
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });
});

async function convert() {
  const amount = document.getElementById("amount").value.trim();
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const resultElement = document.getElementById("result");

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    alert("Please enter a valid amount greater than 0.");
    return;
  }

  resultElement.textContent = "Converting...";

  try {
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
    const response = await fetch(url);
    const data = await response.json();

    const converted = data.rates[to];
    if (!converted) throw new Error("Conversion rate not found.");

    resultElement.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    console.error("Conversion error:", error);
    resultElement.textContent = "Conversion failed. Please try again.";

    
  }
}
