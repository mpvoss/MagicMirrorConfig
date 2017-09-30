/*
 * Module: PortfolioMirror
 * 
 * By Matthew Voss
 * Compounding interest calculator intended for visualizing portfolio projections
 *
 * Default settings assume bi-weekly pay period, i.e.
 * Every two weeks we get paid and some amount (contribution) of our paycheck goes to the retirement account
 * That's why the compound frequency is 52 weeks/2
 *
 *
 *
 */



Module.register("portfolioMirror",{
    // Default module config.
    defaults: {
        contribution : 666,
        interest : 0.08,
        compoundFreq : 26,
        principle : 1540644.47,
        startDate: "September 3, 2017 12:57:00",
        evalTimes: [{text:'Now',number:0}, 
                    {text:'6 months',number:0.5},
                    {text:'1 year',number: 1},
                    {text:'5 years',number: 5},
                    {text:'10 years',number: 10},
                    {text:'25 years',number: 25},
                    {text:'38 years',number: 38}

                   ]
    },
    
    // Define required scripts.
	getStyles: function () {
		return [this.file("css/portfolioMirror.css"), "font-awesome.css"];
	},
    scheduleUpdateInterval: function(ssdd) {
		var self = this;

		

		timer = setInterval(function() {
			
			ssdd.updateDom(0);
		}, 3000);
	},
    start: function(){
        
        this.scheduleUpdateInterval(this);
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");



        var moduleHeader = document.createElement("header");
        moduleHeader.setAttribute("class","module-header");
        moduleHeader.innerHTML = 'Portfolio projections';
        var tbl = document.createElement('table');
        tbl.setAttribute("class","small");
        var tbdy = document.createElement('tbody');

      
       
//        var timeHeader = row.insertCell(0);
//        timeHeader.innerHTML = "<b>Time</b>";
//        var balanceHeader = row.insertCell(1);
//        balanceHeader.innerHTML = "<b>Portfolio value</b>";
        
        startDate = new Date(this.config.startDate);
        now = new Date();
        
        var deltaYears = (now.getTime() - startDate.getTime())/(1000*60*60*24*365);
        
       
        var i = 0;
        for(time in this.config.evalTimes){
            item = this.config.evalTimes[time]
            
            row = tbl.insertRow(i);
            timeCell = row.insertCell(0);
            timeCell.innerHTML = item["text"];
            timeCell.setAttribute("class","bright");
            balanceCell = row.insertCell(1);

            
            balanceCell.setAttribute("class","money");
            
            balanceCell.innerHTML = computePortfolioValue(this.config.principle, item["number"]+deltaYears, this.config.interest, this.config.contribution, this.config.compoundFreq);
            i++;
        }

        tbl.appendChild(tbdy);
        wrapper.appendChild(moduleHeader);
        wrapper.appendChild(tbl)

        return wrapper;
    },

       



});



function computePortfolioValue(principle, years, interest, contribution, compoundFreq){


    newPrin = principle*Math.pow((1+interest/compoundFreq),(compoundFreq*years))
    val = contribution *((Math.pow((1 + interest/compoundFreq),(compoundFreq*years)) - 1) / (interest/compoundFreq)) * (1+interest/compoundFreq)


    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });




    return formatter.format(newPrin + val);
}

