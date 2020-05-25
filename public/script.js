const x = []
const humidity = []
const temperature = []
const moisture = []

const updateChart = () => {
  const ctx = document.getElementById("myChart");
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: x,
      datasets: [
        {
          data: humidity
        },
        {
          data: temperature
        },
        {
          data: moisture
        }
      ]
    }
  });
}

updateChart()

setInterval(() => {
  $.ajax({
    url: 'http://localhost:3000/',
    type: 'get',
    contentType: 'application/json',
    crossDomain: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    // data: JSON.stringify({ "first-name": $('#first-name').val(), "last-name": $('#last-name').val() }),
    processData: false,
    success: function (data, textStatus, jQxhr) {
      console.log(JSON.stringify(data))
      // humidity.push(data.humidity)
      // temperature.push(data.temperature)
      // moisture.push(data.moisture)
      humidity.push(Math.random() * 100)
      temperature.push(Math.random() * 100)
      moisture.push(Math.random() * 100)
      x.push(data.updatedAt.toString())
      updateChart()
    },
    error: function (jqXhr, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
}, 2000)