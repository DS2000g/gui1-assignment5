/*------------------------------------------------------------------------
Name       : Daniel Shapiro
Assignment : Assingment5
Date       : 11/18/2017
Class      : COMP.4610 F2018
File       : assignment5.js
Purpose    : JavaScript file to support Car Purchase Comparison Tool
------------------------------------------------------------------------*/

// function executed on page load
function pageLoad()
{
   removeOutTable();
   removePriceTable();
   removeMPGsTable();
   document.getElementById('repeat').value = "";
} // pageLoad

// function to check if value is integer
function isInt(value)
{
  if (isNaN(value))
  {
     return(false);
  }
  var x = parseFloat(value);
  return((x | 0) === x);
} // isInt

// function to make Form
function makeForm()
{
   var dbg = '';

   dbg = "\nmakeForm\n";
   document.getElementById('debug').value += dbg;

   var cols = document.getElementById("prices").value;
   var rows = document.getElementById("mgps").value;

   var priceArray = new Array(cols+1);

   dbg = 'makeForm: Rows=' + rows + ' Cols=' + cols + "\n";
   document.getElementById('debug').value += dbg;

   // Create priceTable
   var pTable = document.getElementById("priceTable");

   // Clears the Old priceTable
   var oldPLength = document.getElementById("priceTable").rows.length;
   for ( var i = (oldPLength-1); i >= 0; i--)
   {
       document.getElementById("priceTable").deleteRow(i);
   }

   priceArray[0] = pTable.insertRow(0);
   //var pheader=document.createElement("th");
   var phCell = priceArray[0].insertCell(0);//.appendChild(pheader);
   phCell.innerHTML = "Prices";

   for (var i = 1; i <= cols; i++)
   {
      priceArray[i] = pTable.insertRow(i);
      var pCell = priceArray[i].insertCell(0);
      var el = document.createElement('input');
      el.type   = 'text';
      el.name   = 'pTable_' + i;
      el.id     = 'pTable_' + i;
      el.size   = 10;
      el.maxlength = 12;
      el.value  = 0;
      el.addEventListener("blur", priceCheck);
      pCell.appendChild(el);
   }

   // Create mpgTable
   var mTable = document.getElementById("mpgTable");

   var mpgArray = new Array(rows+1);

   // Clears the Old mpgTable
   var oldMLength = document.getElementById("mpgTable").rows.length;
   for ( var i = (oldMLength-1); i >= 0; i--)
   {
       document.getElementById("mpgTable").deleteRow(i);
   }

   mpgArray[0] = mTable.insertRow(0);
   var mhCell = mpgArray[0].insertCell(0);
   mhCell.innerHTML = "MPGs";

   for (var i = 1; i <= rows; i++)
   {
      mpgArray[i] = mTable.insertRow(i);
      var mCell = mpgArray[i].insertCell(0);
      var el = document.createElement('input');
      el.type = 'text';
      el.name = 'mTable_' + i;
      el.id = 'mTable_' + i;
      el.size = 10;
      el.maxlength = 12;
      el.value = 0;
      el.addEventListener("blur", mpgCheck);
      mCell.appendChild(el);
   }

   removeOutTable();

   document.getElementById('repeat').value = "";

   return(0);
} // makeForm

$(document).ready(function(){ $("#years").blur(procYears); });
$(document).ready(function(){ $("#interest").blur(procInterest); });
$(document).ready(function(){ $("#mlYear").blur(procMlYear); });
$(document).ready(function(){ $("#prGal").blur(procPrGal); });
$(document).ready(function(){ $("#prices").blur(procPrices); });
$(document).ready(function(){ $("#mgps").blur(procMPGs); });

// function to process Years input
function procYears()
{
   var years = document.getElementById("years").value;
   if ((!(isInt(years))) || (years < 0))
   {
      document.getElementById("years").value = 0;
      alert("Years <" + years + "> must be positive integer");
   }
   document.getElementById('repeat').value = "";
   if (document.getElementById("outTable").rows.length != 0)
   {
      removeOutTable();
   }
   return(years);
} // procYears

// function to process Interest Rate input
function procInterest()
{
   var interest = document.getElementById("interest").value;
   if ((!(interest == parseFloat(interest))) || (interest < 0))
   {
      document.getElementById("interest").value = 0;
      alert("Interest Rate <" + interest + "> must be valid");
   }
   document.getElementById('repeat').value = "";
   if (document.getElementById("outTable").rows.length != 0)
   {
      removeOutTable();
   }
   return(interest);
} // procInterest

// function to process Miles per Year input
function procMlYear()
{
   var ml = document.getElementById("mlYear").value;
   if ((!(isInt(ml))) || (ml < 0))
   {
      document.getElementById("mlYear").value = 0;
      alert("Miles per year <" + ml + "> must be positive integer");
   }
   document.getElementById('repeat').value = "";
   if (document.getElementById("outTable").rows.length != 0)
   {
      removeOutTable();
   }
   return(ml);
} // procMlYear

// function to process Price per Gallon input
function procPrGal()
{
   document.getElementById('debug').value += "procPrGal";
   var prg = document.getElementById("prGal").value;
   if ((!(prg == parseFloat(prg))) || (prg < 0))
   {
      document.getElementById("prGal").value = 0;
      alert("Price per gallon <" + prg + "> must be valid");
   }
   document.getElementById('repeat').value = "";
   if (document.getElementById("outTable").rows.length != 0)
   {
      removeOutTable();
   }
   return(prg);
} // procPrGal

// function to process Number of Prices input
function procPrices()
{
   removeOutTable();
   removePriceTable();
   removeMPGsTable();
   document.getElementById('repeat').value = "";
   var prices = document.getElementById("prices").value;
   if ((!(isInt(prices))) || (prices < 0))
   {
      document.getElementById("prices").value = 1;
      alert("Number of prices <" + prices + "> must be positive integer");
   }
   return(prices);
} // procPrices

// function to process Number of MPG input
function procMPGs()
{
   removeOutTable();
   removePriceTable();
   removeMPGsTable();
   document.getElementById('repeat').value = "";
   var mgps = document.getElementById("mgps").value;
   if ((!(isInt(mgps))) || (mgps < 0))
   {
      document.getElementById("mgps").value = 1;
      alert("Number of MPGs <" + mgps + "> must be positive integer");
   }  
   return(mgps);
} // procPrices

// function to check Price
function priceCheck()
{  
   document.getElementById('repeat').value = "";
   var cols = document.getElementById("prices").value;
   for (var i = 1; i <= cols; i++)
   {
      var price = document.getElementById("pTable_" + i).value;
      if ((isInt(price)) && (price >= 0))
      {
         document.getElementById('debug').value += "\n" + i + ":" + price;
      }
      else
      {
         document.getElementById("pTable_" + i).value = 0;
         alert("Price [" + i + "] <" + price + "> is NOT an integer");
         return(false);
      }
   }
   if (document.getElementById("outTable").rows.length != 0)
   {
      removeOutTable();
   }
   return(true);
} // priceCheck

/*
// function to check MPG
*/
function mpgCheck()
{  
   document.getElementById('repeat').value = "";
   var rows = document.getElementById("mgps").value;
   for (var i = 1; i <= rows; i++)
   {
      var mpg = document.getElementById("mTable_" + i).value;
      if ((isInt(mpg)) && (mpg >= 0))
      {
         document.getElementById('debug').value += "\n" + i + ":" + mpg;
      }
      else
      {
         document.getElementById("mTable_" + i).value = 0;
         alert("MPG [" + i + "] <" + mpg + "> is NOT an integer");
         return(false);
      }
   }
   if (document.getElementById("outTable").rows.length != 0)
   {
      removeOutTable();
   }
   return(true);
} // mpgCheck

// function to check data
function verifyData()
{
   var text = '';

   // Common Options
   text += 'Years           :' + document.getElementById('years').value;
   text += '\nInterest Rate   :' + document.getElementById('interest').value;
   text += '\nMiles Per Year  :' + document.getElementById('mlYear').value;
   text += '\nPrice Per Gallon:' + document.getElementById('prGal').value;

   // Prices
   var cols = document.getElementById("prices").value;
   text += '\n\nPrices( ' + cols + ' ): ';
   for (var i = 1; i <= cols; i++)
   {
      text += document.getElementById('pTable_' + i).value + ' '
   }

   // MPGs
   var rows = document.getElementById("mgps").value;
   text += '\n\nMPGs( ' + rows + ' )  : ';
   for (var i = 1; i <= rows; i++)
   {
      text += document.getElementById('mTable_' + i).value + ' '
   }

   // Insert text to repeat
   document.getElementById('repeat').value = text;

   return(true);
} // verifyData

//function to remove Output Table
function removeOutTable()
{
   // Clears the Old priceTable
   var oldLength = document.getElementById("outTable").rows.length;
   for ( var i = (oldLength-1); i >= 0; i--)
   {
       document.getElementById("outTable").deleteRow(i);
   }
}

//function to remove Price Table
function removePriceTable()
{
   // Clears the Old priceTable
   var oldLength = document.getElementById("priceTable").rows.length;
   for ( var i = (oldLength-1); i >= 0; i--)
   {
       document.getElementById("priceTable").deleteRow(i);
   }
}

//function to remove MPGs Table
function removeMPGsTable()
{
   // Clears the Old priceTable
   var oldLength = document.getElementById("mpgTable").rows.length;
   for ( var i = (oldLength-1); i >= 0; i--)
   {
       document.getElementById("mpgTable").deleteRow(i);
   }
}

//function to make table
function makeOutTable()
{
   var cols = document.getElementById("prices").value;
   var rows = document.getElementById("mgps").value;
   var dbg = '';

   dbg = 'Rows=' + rows + ' Cols=' + cols + "\n";
   document.getElementById('debug').value += dbg; 

   var tableArray = new Array(rows+1);

   // Get the table
   var table = document.getElementById("outTable");

   removeOutTable();

   tableArray[0] = table.insertRow(0);
   var tblNameCell = tableArray[0].insertCell(0);
   tblNameCell.innerHTML = "Price/Fuel Comsumption";

   for (var i = 1; i <= cols; i++)
   {
      var price = parseFloat(document.getElementById('pTable_' + i).value);
      var cell = tableArray[0].insertCell(i);
      cell.innerHTML = "Price " + i + " ($" + price.toFixed(0) + ")";
   }

   var months = document.getElementById('years').value * 12;
   var interest = parseFloat(document.getElementById('interest').value);
   interest = interest / 100 / 12;
   var mlYears = document.getElementById('mlYear').value;
   var prGal = document.getElementById('prGal').value;

   var lowest = new Array(3);  // [0] - cost [1] - row/i  [2] - cols/j
   var highest = new Array(3); // [0] - cost [1] - row/i  [2] - cols/j

   lowest[0] = 1000000;
   lowest[1] = 1;
   lowest[2] = 1;
   highest[0] = 0;
   highest[1] = 1;
   highest[2] = 1;


   for (var i = 1; i <= rows; i++)
   {
      tableArray[i] = table.insertRow(i);
      var hCell = tableArray[i].insertCell(0);
      var mpg = parseFloat(document.getElementById('mTable_' + i).value);
      hCell.innerHTML = "MPG " + i + " (" + mpg.toFixed(2) + ")";
      for (var j = 1; j <= cols; j++)
      {
         // Calculate Cost per month
         var price = parseFloat(document.getElementById('pTable_' + j).value);

         // compute the monthly payment figure
         var x = Math.pow(1 + interest, months); //Math.pow computes powers
         var monthly = (price*x*interest)/(x-1);

         var cell = tableArray[i].insertCell(j);
         var pmo = document.createElement('output');
         pmo.type = 'text';
         pmo.name = 'pmo_' + i + '_' + j;
         pmo.id = 'pmo_' + i + '_' + j;
         pmo.size = 20;
         pmo.maxlength = 20;
         pmo.value = '$' + monthly.toFixed(2) + ' /mo';
         cell.appendChild(pmo);
         cell.appendChild(document.createElement('BR'));

         // Calculate Cost per Mile
         var pml = document.createElement('output');
         pml.type = 'text';
         pml.name = 'pml_' + i + '_' + j;
         pml.id = 'pml_' + i + '_' + j;
         pml.size = 20;
         pml.maxlength = 20;
         pml.value = '$' + (prGal/mpg).toFixed(2) + ' /ml';
         cell.appendChild(pml);
         cell.appendChild(document.createElement('BR'));
         var tot = document.createElement('output');
         tot.type = 'text';
         tot.name = 'tab_' + i + '_' + j;
         tot.id = 'tab_' + i + '_' + j;
         tot.size = 20;
         tot.maxlength = 20;
         var cost = (monthly + (prGal/mpg) * (mlYears/12));
         tot.value = '$' + cost.toFixed(2);
         cell.appendChild(tot);

         if (highest[0] < cost)
         {
            highest[0] = cost;
            if (document.getElementById('tab_' + highest[1] + '_' + highest[2]).style.color == "red")
            {
               document.getElementById('tab_' + highest[1] + '_' + highest[2]).style.color = "white";
            }
            highest[1] = i;
            highest[2] = j
            tot.style.color = "red";
         }
         if (lowest[0] >= cost)
         {
            lowest[0] = cost;
            if (document.getElementById('tab_' + lowest[1] + '_' + lowest[2]).style.color == "green")
            {
               document.getElementById('tab_' + lowest[1] + '_' + lowest[2]).style.color = "white";
            }
            lowest[1] = i;
            lowest[2] = j;
            tot.style.color = "green";
         }
      }
   }
   
   return(true);
} // makeOutTable

