async function main() {
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
  
    const stockData = await getStockData();
  
    let GME = stockData.GME;
    let MSFT = stockData.MSFT;
    let DIS = stockData.DIS;
    let BNTX = stockData.BNTX;
  
    const stocks = [GME, MSFT, DIS, BNTX];
  
  
    console.log(stocks);
  
    function getColor(stock){
      if(stock === "GME"){
          return 'rgba(61, 161, 61, 0.7)'
      }
      if(stock === "MSFT"){
          return 'rgba(209, 4, 25, 0.7)'
      }
      if(stock === "DIS"){
          return 'rgba(18, 4, 209, 0.7)'
      }
      if(stock === "BNTX"){
          return 'rgba(166, 43, 158, 0.7)'
      }
  }
  
  stocks.forEach (stock => stock.values.reverse())
  
    new Chart(timeChartCanvas.getContext('2d'), {
      type: 'line',
      data: {
          labels: stocks[0].values.map(value => value.datetime),
          datasets: stocks.map( stock => ({
              label: stock.meta.symbol,
              data: stock.values.map(value => parseFloat(value.high)),
              backgroundColor:  getColor(stock.meta.symbol),
              borderColor: getColor(stock.meta.symbol),
          }))
      }
  });
  
  
  
    console.log(Chart);
    console.log(stocks[0].values)                                                  
  
  }
  
  async function getStockData() {
    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=8ccafb07a56344ca9a36d69123f0e5bf');
    let jsonString = await response.text();
  
    let result = JSON.parse(jsonString);
  
    return result;
  }
  
  main();
  