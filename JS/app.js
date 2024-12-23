// Clase para representar una tasa de impuesto
class TaxRate {
  constructor(minIncome, maxIncome, rate) {
      this.minIncome = minIncome;
      this.maxIncome = maxIncome;
      this.rate = rate;
  }

  calculateTax(income) {
      if (income >= this.minIncome && income <= this.maxIncome) {
          return income * this.rate;
      }
      return 0;
  }
}

// Definimos las tasas de impuestos en un arreglo de objetos
const taxRates = [
  new TaxRate(0, 10000, 0.05),
  new TaxRate(10001, 20000, 0.1),
  new TaxRate(20001, 50000, 0.15),
  new TaxRate(50001, Infinity, 0.2)
];

// Historial de simulaciones
let simulationHistory = JSON.parse(localStorage.getItem("simulationHistory")) || [];

// Actualizar el historial en el DOM
function updateSimulationHistory() {
  const historyContainer = document.getElementById("simulation-history");
  historyContainer.innerHTML = "";

  simulationHistory.forEach(simulation => {
      const simulationDiv = document.createElement("div");
      simulationDiv.classList.add("simulation-item");

      simulationDiv.innerHTML = `
          <span>Ingreso: </span>$${simulation.income} - 
          <span>Impuesto: </span>$${simulation.tax} - 
          <span>Fecha: </span>${simulation.date}
      `;
      historyContainer.appendChild(simulationDiv);
  });
}

// Calcular impuestos
function calculateTax(income) {
  const taxRate = taxRates.find(rate => income >= rate.minIncome && income <= rate.maxIncome);
  if (!taxRate) {
      return 0;
  }
  return taxRate.calculateTax(income);
}

// Manejo del formulario
document.getElementById("tax-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const income = parseFloat(document.getElementById("income").value);
  if (isNaN(income) || income <= 0) {
      alert("Por favor, ingrese un valor válido.");
      return;
  }

  const tax = calculateTax(income);
  const resultText = document.getElementById("result-text");
  resultText.textContent = `El impuesto para un ingreso de $${income} es $${tax.toFixed(2)}.`;

  // Agregar simulación al historial
  const simulation = {
      income: income,
      tax: tax,
      date: new Date().toLocaleString()
  };
  simulationHistory.push(simulation);
  localStorage.setItem("simulationHistory", JSON.stringify(simulationHistory));

  updateSimulationHistory();
});

// Inicializar el historial al cargar la página
updateSimulationHistory();
